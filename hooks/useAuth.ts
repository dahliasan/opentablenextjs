import { AuthenticationContext } from '@/context/AuthContext'
import axios from 'axios'
import { removeCookies } from 'cookies-next'
import { useContext } from 'react'

const useAuth = () => {
  const { data, error, loading, setAuthState } = useContext(
    AuthenticationContext
  )

  const signin = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    setAuthState({ loading: true, error: null, data: null })

    try {
      const response = await axios.post('/api/auth/signin', {
        email,
        password,
      })

      setAuthState({ loading: false, error: null, data: response.data })
    } catch (error: any) {
      setAuthState({
        loading: false,
        error: error.response.data.message,
        data: null,
      })
    }
  }

  const signup = async (
    {
      email,
      password,
      firstName,
      lastName,
      city,
      phone,
    }: {
      email: string
      password: string
      firstName: string
      lastName: string
      city: string
      phone: string
    },
    handleClose: () => void
  ) => {
    setAuthState({ loading: true, error: null, data: null })

    try {
      const response = await axios.post('/api/auth/signup', {
        email,
        password,
        firstName,
        lastName,
        city,
        phone,
      })

      setAuthState({ loading: false, error: null, data: response.data })
      handleClose()
    } catch (error: any) {
      setAuthState({
        loading: false,
        error: error.response.data.message,
        data: null,
      })
    }
  }

  const signout = async () => {
    removeCookies('jwt')
    setAuthState({ loading: false, error: null, data: null })
  }

  return {
    signin,
    signup,
    signout,
  }
}

export default useAuth
