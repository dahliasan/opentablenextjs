'use client'

import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react'
import axios from 'axios'
import { getCookie } from 'cookies-next'

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  city: string
  phone: string
}

interface State {
  loading: boolean
  data: User | null
  error: string | null
}

interface AuthState extends State {
  setAuthState: Dispatch<SetStateAction<State>>
}

export const AuthenticationContext = createContext<AuthState>({
  loading: false,
  data: null,
  error: null,
  setAuthState: () => ({}),
})

export default function AuthContext({
  children,
}: {
  children: React.ReactNode
}) {
  const [authState, setAuthState] = useState<State>({
    loading: true,
    data: null,
    error: null,
  })

  const fetchUser = async () => {
    setAuthState({ loading: true, error: null, data: null })

    //  get token from cookie
    const jwt = getCookie('jwt')

    if (!jwt) return setAuthState({ loading: false, error: null, data: null })

    try {
      const response = await axios.get('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
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
  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  )
}
