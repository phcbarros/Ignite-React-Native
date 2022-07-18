import React, {createContext, useEffect} from 'react'
import * as AuthSession from 'expo-auth-session'
import * as AppleAuthentication from 'expo-apple-authentication'
import {Storage} from '../infrastructure/storage'

const {CLIENT_ID} = process.env
const {REDIRECT_URI} = process.env
const USER_STORAGE_KEY = '@gofinances:user'

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
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signInWithApple: () => Promise<void>
  signOut: () => Promise<void>
}

interface AuthorizationResponse {
  params: {
    access_token: string
  }
  type: string
}

const AuthContext = createContext({} as AuthContextData)

function AuthProvider({children}: AuthProviderProps) {
  const [user, setUser] = React.useState<User>({} as User)
  const [loading, setLoading] = React.useState(true)

  async function signInWithGoogle() {
    try {
      const RESPONSE_TYPE = 'token'
      const SCOPE = encodeURI('profile email')
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

      const {type, params} = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse

      if (type === 'success') {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`,
        )
        const userInfo = await response.json()

        const loggedUser = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture,
        }

        setUser(loggedUser)

        await Storage.save(loggedUser, USER_STORAGE_KEY)
      }
    } catch (error) {
      throw new Error(error as string)
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      })

      console.log('credential', credential)

      if (credential) {
        const loggedUser = {
          id: String(credential.user),
          email: credential.email!,
          name: credential.fullName?.givenName!,
          photo: `https://ui-avatars.com/api/?name=${credential.fullName?.namePrefix}+${credential.fullName?.nameSuffix}&length=1`,
        }

        setUser(loggedUser)

        await Storage.save(loggedUser, USER_STORAGE_KEY)
      }
    } catch (error) {
      throw new Error(error as string)
    }
  }

  async function signOut() {
    setLoading(true)
    setUser({} as User)
    await Storage.deleteAll(USER_STORAGE_KEY)
    setLoading(false)
  }

  useEffect(() => {
    async function loadUserData() {
      const data = await Storage.get<User>(USER_STORAGE_KEY, null)

      if (data) {
        setUser(data)
      }

      setLoading(false)
    }

    loadUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signInWithApple,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = React.useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}

export {AuthProvider, useAuth}
