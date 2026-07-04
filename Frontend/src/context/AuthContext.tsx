import { createContext, useContext, useState, type ReactNode } from 'react'

const API = 'http://localhost:3000/api'

interface AuthContextType {
  isAuth: boolean
  token: string | null
  login: (user: string, pass: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('anfa_token'))
  const [isAuth, setIsAuth] = useState(() => !!localStorage.getItem('anfa_token'))

  const login = async (user: string, pass: string) => {
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, pass }),
      })
      if (!res.ok) return false
      const data = await res.json()
      localStorage.setItem('anfa_token', data.token)
      setToken(data.token)
      setIsAuth(true)
      return true
    } catch {
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('anfa_token')
    setToken(null)
    setIsAuth(false)
  }

  return (
    <AuthContext.Provider value={{ isAuth, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}