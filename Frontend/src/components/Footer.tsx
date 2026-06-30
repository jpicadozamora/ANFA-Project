export default function Footer() {
  return (
    <footer className="relative bg-black py-16 px-6 border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <p className="text-xl text-white mb-3 font-bold tracking-tight">
              ANFA <span className="text-white/50 font-light italic">del Lago</span>
            </p>
            <p className="text-white/30 text-sm leading-relaxed">
              Construcción & Bienes Raíces. Calidad y confianza desde 2010.
            </p>
          </div>
          <div>
            <h4 className="text-white/40 text-xs uppercase tracking-widest mb-4">Enlaces</h4>
            <ul className="space-y-2">
              {[['Inicio', '#hero'], ['Nosotros', '#about'], ['Portafolio', '#portfolio'], ['Propiedades', '#properties'], ['Contacto', '#contact']].map(([l, h]) => (
                <li key={l}>
                  <a href={h} className="text-white/30 hover:text-white text-sm transition-colors duration-300">{l}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white/40 text-xs uppercase tracking-widest mb-4">Contacto</h4>
            <ul className="space-y-2 text-white/30 text-sm">
              <li>Guadalajara, Jal.</li>
              <li>+52 (33) 1234 5678</li>
              <li>contacto@anfadellago.com</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white/40 text-xs uppercase tracking-widest mb-4">Síguenos</h4>
            <div className="flex gap-3">
              {['M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z', 'M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z', 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z'].map((d, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all duration-300 group">
                  <svg className="w-4 h-4 text-white/30 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center">
          <p className="text-white/20 text-xs">
            &copy; {new Date().getFullYear()} ANFA del Lago. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
