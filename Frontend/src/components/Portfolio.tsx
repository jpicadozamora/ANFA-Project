import { useData } from '../context/DataContext'

export default function Portfolio() {
  const { projects } = useData()

  return (
    <section id="portfolio" className="relative py-28 px-6 bg-gray-50 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.02)_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16 reveal">
          <span className="text-gray-400 text-xs tracking-[0.3em] uppercase font-medium">Nuestro trabajo</span>
          <h2 className="text-4xl md:text-5xl text-black mt-3 mb-4 font-light">
            Proyectos <span className="font-bold">Realizados</span>
          </h2>
          <div className="w-16 h-0.5 bg-black/10 mx-auto" />
          <p className="text-gray-400 mt-6 max-w-lg mx-auto text-sm">
            Conoce algunos de los proyectos que hemos realizado con dedicación y excelencia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div
              key={p.id}
              className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl cursor-pointer reveal-scale border border-gray-100"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="relative h-52 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 project-img transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/20">
                  <span className="text-white text-xs tracking-widest uppercase bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    Ver proyecto
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-black font-semibold text-lg mb-2 group-hover:text-gray-500 transition-colors duration-300">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{p.description}</p>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-16">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="text-gray-400 text-sm">No hay proyectos publicados por el momento.</p>
          </div>
        )}
      </div>
    </section>
  )
}
