const stats = [
  { value: '15+', label: 'Años de experiencia' },
  { value: '200+', label: 'Proyectos entregados' },
  { value: '98%', label: 'Clientes satisfechos' },
  { value: '50+', label: 'Colaboradores' },
]

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16 reveal">
          <span className="text-gray-400 text-xs tracking-[0.3em] uppercase font-medium">Quiénes somos</span>
          <h2 className="text-4xl md:text-5xl text-black mt-3 mb-4 font-light">
            Sobre <span className="font-bold">Nosotros</span>
          </h2>
          <div className="w-16 h-0.5 bg-black/10 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div className="reveal-left space-y-5">
            <p className="text-gray-600 leading-relaxed">
              Somos una empresa con más de <span className="text-black font-semibold">15 años de trayectoria</span> en el sector de la construcción y bienes raíces. Nos especializamos en desarrollar proyectos residenciales, comerciales e industriales que superan las expectativas de nuestros clientes.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Nuestro equipo de profesionales altamente calificados trabaja con los más altos estándares de calidad, asegurando que cada proyecto sea entregado en tiempo y forma.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Creemos en construir relaciones duraderas basadas en la confianza, la transparencia y el compromiso con la excelencia.
            </p>
            <div className="flex gap-6 pt-4">
              {['Calidad garantizada', 'Confianza total'].map((text) => (
                <div key={text} className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="w-4 h-4 text-black/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {text}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 reveal-right">
            {stats.map((s) => (
              <div key={s.label} className="group relative bg-white p-7 rounded-2xl text-center border border-gray-100 hover:border-gray-300 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                <span className="block text-4xl text-black font-bold mb-1.5">{s.value}</span>
                <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors duration-300">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative reveal-scale">
          <div className="absolute inset-0 bg-gray-50 rounded-3xl" />
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 p-8 md:p-10 text-center">
            <p className="text-gray-500 text-lg italic font-light max-w-2xl mx-auto">
              "Más que construir edificios, construimos confianza. Cada proyecto es un compromiso con la excelencia."
            </p>
            <div className="mt-4 w-10 h-0.5 bg-black/10 mx-auto" />
          </div>
        </div>
      </div>
    </section>
  )
}
