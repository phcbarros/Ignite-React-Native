import React, {createContext} from 'react'

interface AuthProviderProps {
  children: React.ReactNode
}

interface User {
  id: string
  name: string
  email: string
  photo?: string
}

interface AuthContextData {
  user: User
}

const AuthContext = createContext({} as AuthContextData)

function AuthProvider({children}: AuthProviderProps) {
  const user: User = {
    id: '1',
    name: 'PH',
    email: 'teste@teste.com',
  }
  return (
    <AuthContext.Provider
      value={{
        user,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = React.useContext(AuthContext)

  return context
}

export {AuthProvider, useAuth}
