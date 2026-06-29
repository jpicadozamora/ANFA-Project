import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Portfolio from './components/Portfolio'
import Properties from './components/Properties'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Login from './admin/Login'
import Dashboard from './admin/Dashboard'
import './App.css'

function HomePage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.1 }
    )

    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
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
