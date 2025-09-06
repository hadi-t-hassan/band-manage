import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import type { AuthUser } from '../api/auth'
import { getMe, loginUser, registerUser, logoutUser } from '../api/auth'
import { clearTokens, getRefreshToken, setTokens } from '../utils/tokenStorage'

type AuthContextType = {
  user: AuthUser | null
  isAuthenticated: boolean
  initializing: boolean
  login: (input: { username: string; password: string }) => Promise<void>
  register: (input: { username: string; email: string; password: string }) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [initializing, setInitializing] = useState(true)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const hydrate = useCallback(async () => {
    try {
      const me = await getMe()
      setUser(me)
    } catch {
      setUser(null)
    } finally {
      setInitializing(false)
    }
  }, [])

  useEffect(() => {
    hydrate()
  }, [hydrate])

  const login = useCallback(async ({ username, password }: { username: string; password: string }) => {
    const { access, refresh } = await loginUser({ username, password })
    setTokens(access, refresh)
    const me = await getMe()
    setUser(me)
  }, [])

  const register = useCallback(
    async ({ username, email, password }: { username: string; email: string; password: string }) => {
      const { user: createdUser, access, refresh } = await registerUser({ username, email, password })
      setTokens(access, refresh)
      setUser(createdUser)
    },
    []
  )

  const logout = useCallback(async () => {
    try {
      const refresh = getRefreshToken()
      if (refresh) await logoutUser(refresh)
    } catch {}
    clearTokens()
    setUser(null)
    await queryClient.clear()
    navigate('/login', { replace: true })
  }, [navigate, queryClient])

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, initializing, login, register, logout }),
    [user, initializing, login, register, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

