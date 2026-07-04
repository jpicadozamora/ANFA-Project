import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formKey, setFormKey] = useState(0)

  // Forzar reconstrucción del formulario al cargar
  useEffect(() => {
    setFormKey(prev => prev + 1)
    setUser('')
    setPass('')
    setError(false)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    
    try {
      const success = await login(user, pass)
      if (success) {
        navigate('/admin/dashboard', { replace: true })
      } else {
        setError(true)
        setPass('')
        setUser('')
        // Forzar reconstrucción del formulario
        setFormKey(prev => prev + 1)
      }
    } catch (err) {
      setError(true)
      setPass('')
      setUser('')
      // Forzar reconstrucción del formulario
      setFormKey(prev => prev + 1)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <div className="relative w-full max-w-sm">
        <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-10 border border-white/10 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 mb-5">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">
              ANFA <span className="text-white/50 font-light italic">del Lago</span>
            </h1>
            <p className="text-white/30 text-sm">Panel de Administración</p>
          </div>

          <form key={formKey} onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            <input 
              placeholder="Usuario" 
              value={user} 
              onChange={(e) => setUser(e.target.value)} 
              required 
              autoFocus
              autoComplete="off"
              name={`user-${Date.now()}`}
              className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300 text-sm" 
            />
            <input 
              type="password" 
              placeholder="Contraseña" 
              value={pass} 
              onChange={(e) => setPass(e.target.value)} 
              required
              autoComplete="off"
              name={`pass-${Date.now()}`}
              className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300 text-sm" 
            />

            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-red-400 text-sm">Credenciales incorrectas</p>
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-xl bg-white text-black font-semibold text-sm transition-all duration-300 hover:shadow-xl hover:shadow-white/10 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? 'Entrando...' : 'Iniciar sesión'}
            </button>
          </form>

          <a href="/" className="block text-center mt-6 text-white/30 text-sm hover:text-white/60 transition-colors duration-300">
            ← Volver al sitio
          </a>
        </div>
      </div>
    </div>
  )
}
