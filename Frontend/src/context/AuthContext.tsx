import { createContext, useContext, useState, type ReactNode } from 'react'

interface AuthContextType {
  isAuth: boolean
  login: (user: string, pass: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const ADMIN_USER = 'admin'
const ADMIN_PASS = 'admin123'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuth, setIsAuth] = useState(() => localStorage.getItem('anfa_admin') === '1')

  const login = (user: string, pass: string) => {
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      localStorage.setItem('anfa_admin', '1')
      setIsAuth(true)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem('anfa_admin')
    setIsAuth(false)
  }

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
