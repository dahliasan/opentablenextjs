'use client'

import { useState, createContext, Dispatch, SetStateAction } from 'react'

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
    loading: false,
    data: null,
    error: null,
  })

  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  )
}
