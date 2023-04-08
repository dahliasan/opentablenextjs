'use client'
import { useEffect, useState, useContext } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import AuthModalInputs from './AuthModalInputs'
import useAuth from '@/hooks/useAuth'
import { AuthenticationContext } from '@/context/AuthContext'
import { Alert, CircularProgress } from '@mui/material'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function AuthModal({ isSignIn }: { isSignIn: boolean }) {
  const { data, error, loading } = useContext(AuthenticationContext)
  const [open, setOpen] = useState(false)
  const [disabled, setDisabled] = useState(true)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { signin, signup } = useAuth()

  const renderContent = (signInContent: string, signUpContent: string) => {
    return isSignIn ? signInContent : signUpContent
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInputs((prev) => ({ ...prev, [name]: value }))
  }

  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    password: '',
  })

  // validate that all inputs are filled
  useEffect(() => {
    if (isSignIn) {
      if (inputs.email && inputs.password) setDisabled(false)
    } else {
      if (
        inputs.firstName &&
        inputs.lastName &&
        inputs.email &&
        inputs.phone &&
        inputs.city &&
        inputs.password
      ) {
        setDisabled(false)
      }
    }
  }, [inputs])

  const handleSubmit = () => {
    if (isSignIn) {
      signin({
        email: inputs.email,
        password: inputs.password,
      })
    }
  }

  return (
    <div>
      <button
        onClick={handleOpen}
        className={`${
          isSignIn && 'bg-blue-400 text-white '
        } border p-1 px-4 rounded mr-3`}
      >
        {renderContent('Sign in', 'Sign up')}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div className='p-2 h-[80vh] '>
            <div className='uppercase font-bold text-center pb-2 border-b mb-2 dark:text-black'>
              <p className='text-sm'>
                {renderContent('Sign in', 'Create account')}
              </p>
            </div>
            <div className='m-auto'>
              <h2 className='text-2xl-font-light text-center'>
                {renderContent(
                  'Login to your account',
                  'Create your OpenTable account'
                )}
              </h2>
              <AuthModalInputs
                inputs={inputs}
                handleChangeInput={handleChangeInput}
                isSignIn={isSignIn}
              />

              <button
                disabled={disabled}
                onClick={handleSubmit}
                className='uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400 flex gap-8 justify-center align-middle'
              >
                {}
                {loading ? (
                  <CircularProgress
                    color='inherit'
                    className='text-white'
                    size={20}
                  />
                ) : (
                  renderContent('Sign in', 'Create account')
                )}
              </button>
              {error && <Alert severity='error'>{error}</Alert>}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
