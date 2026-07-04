import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { useData } from './context/DataContext'
import { useRevealOnScroll } from './hooks/useRevealOnScroll'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Remodelations from './components/Remodelations'
import Portfolio from './components/Portfolio'
import Properties from './components/Properties'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Login from './admin/Login'
import Dashboard from './admin/Dashboard'
import './App.css'

function HomePage() {
  const { loading, properties, projects, remodelations } = useData()
  useRevealOnScroll(loading, properties.length, projects.length, remodelations.length)

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Remodelations />
        <Portfolio />
        <Properties />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

function AdminRoute() {
  const { isAuth } = useAuth()
  if (!isAuth) return <Navigate to="/admin" replace />
  return <Dashboard />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<Login />} />
      <Route path="/admin/dashboard" element={<AdminRoute />} />
    </Routes>
  )
}
