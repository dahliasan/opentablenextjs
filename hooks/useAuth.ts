import { AuthenticationContext } from '@/context/AuthContext'
import axios from 'axios'
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

      console.log(response)

      setAuthState({ loading: false, error: null, data: response.data })
    } catch (error: any) {
      setAuthState({
        loading: false,
        error: error.response.data.message,
        data: null,
      })
    }
  }

  const signup = () => {
    // Sign up logic
  }

  return {
    signin,
    signup,
  }
}

export default useAuth
