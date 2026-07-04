import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AdminPortfolio from './AdminPortfolio'
import AdminProperties from './AdminProperties'
import AdminRemodelations from './AdminRemodelations'
import AdminSiteSettings from './AdminSiteSettings'

const tabs = [
  { key: 'portfolio', label: 'Portafolio', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  { key: 'properties', label: 'Propiedades', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { key: 'remodelations', label: 'Remodelaciones', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
  { key: 'site', label: 'Sitio', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
]

export default function Dashboard() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('portfolio')

  const handleLogout = () => {
    logout()
    navigate('/admin', { replace: true })
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <header className="bg-white/5 backdrop-blur-xl border-b border-white/5 px-6 md:px-10 py-4 flex items-center gap-6 sticky top-0 z-50">
        <h1 className="text-lg font-bold text-white whitespace-nowrap tracking-tight">
          ANFA <span className="text-white/50 font-light italic">del Lago</span>
        </h1>
        <nav className="hidden md:flex gap-1 flex-1">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${
                tab === t.key ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={t.icon} /></svg>
              {t.label}
            </button>
          ))}
        </nav>
        <div className="md:hidden flex gap-1 flex-1">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all duration-300 cursor-pointer ${
                tab === t.key ? 'bg-white/10 text-white' : 'text-white/40'
              }`}>{t.label}</button>
          ))}
        </div>
        <button onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-white/40 text-sm hover:text-red-400 hover:border-red-400/30 transition-all duration-300 cursor-pointer">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          <span className="hidden sm:inline">Salir</span>
        </button>
      </header>
      <main className="flex-1 p-6 md:p-10 max-w-5xl w-full mx-auto">
        {tab === 'portfolio' && <AdminPortfolio />}
        {tab === 'properties' && <AdminProperties />}
        {tab === 'remodelations' && <AdminRemodelations />}
        {tab === 'site' && <AdminSiteSettings />}
      </main>
    </div>
  )
}
