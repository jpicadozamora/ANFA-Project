import { useState } from 'react'
import { useData } from '../context/DataContext'

const API = 'http://localhost:3000/api'

export default function Contact() {
  const { siteSettings } = useData()
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await fetch(`${API}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    } catch {}
    setSent(true)
    setForm({ name: '', email: '', phone: '', message: '' })
    setTimeout(() => setSent(false), 4000)
  }

  const contactInfo = [
    siteSettings.address && {
      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
      title: 'Dirección',
      text: siteSettings.address,
    },
    siteSettings.phone && {
      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
      title: 'Teléfono',
      text: siteSettings.phone,
    },
    siteSettings.email && {
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      title: 'Correo',
      text: siteSettings.email,
    },
    siteSettings.schedule && {
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      title: 'Horario',
      text: siteSettings.schedule,
    },
  ].filter(Boolean) as { icon: string; title: string; text: string }[]

  return (
    <section id="contact" className="relative py-28 px-6 bg-black overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16 reveal">
          <span className="text-white/30 text-xs tracking-[0.3em] uppercase font-medium">Comunícate</span>
          <h2 className="text-4xl md:text-5xl text-white mt-3 mb-4 font-light">
            Ponte en <span className="font-bold">Contacto</span>
          </h2>
          <div className="w-16 h-0.5 bg-white/10 mx-auto" />
          <p className="text-white/30 mt-6 max-w-lg mx-auto text-sm">
            Estamos listos para ayudarte. Contáctanos y te responderemos a la brevedad.
          </p>
        </div>

        <div className={`grid gap-10 ${contactInfo.length > 0 ? 'md:grid-cols-5' : ''}`}>
          <form className={`space-y-5 reveal-left ${contactInfo.length > 0 ? 'md:col-span-3' : 'max-w-2xl mx-auto w-full'}`} onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input name="name" placeholder="Nombre completo" value={form.name} onChange={handleChange} required
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300 text-sm" />
              <input name="email" type="email" placeholder="Correo electrónico" value={form.email} onChange={handleChange} required
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300 text-sm" />
            </div>
            <input name="phone" placeholder="Teléfono" value={form.phone} onChange={handleChange}
              className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300 text-sm" />
            <textarea name="message" placeholder="Escribe tu mensaje..." rows={5} value={form.message} onChange={handleChange} required
              className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300 text-sm resize-none" />
            <button type="submit"
              className="group relative px-8 py-4 rounded-xl bg-white text-black font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-white/10 hover:-translate-y-0.5 text-sm">
              <span className="relative z-10 flex items-center gap-2">
                {sent ? '✓ Mensaje enviado' : (
                  <>Enviar mensaje
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </>
                )}
              </span>
            </button>
          </form>

          {contactInfo.length > 0 && (
            <div className="md:col-span-2 space-y-4 reveal-right">
              {contactInfo.map((info) => (
                <div key={info.title} className="group flex items-start gap-4 bg-white/5 backdrop-blur-sm p-5 rounded-xl border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                    <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={info.icon} />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white/50 text-xs uppercase tracking-widest mb-1">{info.title}</h4>
                    <p className="text-white/40 text-sm whitespace-pre-line leading-relaxed">{info.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
