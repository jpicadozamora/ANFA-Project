import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Nosotros', href: '#about' },
  { label: 'Portafolio', href: '#portfolio' },
  { label: 'Propiedades', href: '#properties' },
  { label: 'Contacto', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-700 ${
      scrolled ? 'bg-white/95 backdrop-blur-xl shadow-sm py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="#hero" className="text-xl font-bold tracking-tight" onClick={(e) => handleNav(e, '#hero')}>
          <span className={scrolled ? 'text-black' : 'text-white'}>ANFA</span>{' '}
          <span className={`font-light italic ${scrolled ? 'text-gray-400' : 'text-white/70'}`}>del Lago</span>
        </a>

        <button
          className="lg:hidden relative w-8 h-8 flex items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <div className="flex flex-col gap-1.5">
            <span className={`block w-6 h-0.5 rounded-full transition-all duration-400 ${menuOpen ? 'rotate-45 translate-y-2 bg-black' : scrolled ? 'bg-black' : 'bg-white'}`} />
            <span className={`block w-6 h-0.5 rounded-full transition-all duration-400 ${menuOpen ? 'opacity-0' : scrolled ? 'bg-black' : 'bg-white'}`} />
            <span className={`block w-6 h-0.5 rounded-full transition-all duration-400 ${menuOpen ? '-rotate-45 -translate-y-2 bg-black' : scrolled ? 'bg-black' : 'bg-white'}`} />
          </div>
        </button>

        <ul className={`fixed lg:static top-0 right-0 h-screen lg:h-auto w-72 lg:w-auto bg-white lg:bg-transparent flex-col lg:flex-row flex gap-1 pt-24 lg:pt-0 px-8 lg:px-0 transition-all duration-500 shadow-2xl lg:shadow-none ${
          menuOpen ? 'right-0' : '-right-80 lg:right-auto'
        }`}>
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => handleNav(e, l.href)}
                className={`block lg:inline-block text-sm tracking-wide transition-all duration-300 lg:px-4 py-3 lg:py-1 relative group ${
                  scrolled ? 'lg:text-gray-600 lg:hover:text-black' : 'lg:text-white/70 lg:hover:text-white'
                } text-gray-700 hover:text-black`}
              >
                {l.label}
                <span className={`hidden lg:block absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 rounded-full group-hover:w-full transition-all duration-400 ${
                  scrolled ? 'bg-black/30' : 'bg-white/50'
                }`} />
              </a>
            </li>
          ))}
          <li className="lg:ml-4">
            <a
              href="/admin"
              className={`block lg:inline-block text-center mt-2 lg:mt-0 px-4 py-2 rounded-full text-xs tracking-widest uppercase transition-all duration-300 ${
                scrolled
                  ? 'border border-gray-300 text-gray-500 hover:border-gray-900 hover:text-gray-900'
                  : 'border border-white/30 text-white/70 hover:border-white hover:text-white'
              }`}
            >
              Admin
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
