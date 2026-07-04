import { useState } from 'react'
import { useData } from '../context/DataContext'

export default function Remodelations() {
  const { remodelations } = useData()

  console.log('=== REMODELATIONS COMPONENT ===')
  console.log('remodelations:', remodelations)
  console.log('length:', remodelations.length)

  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <section id="remodelations" className="relative py-28 px-6 bg-gray-50 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.02)_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16 reveal">
          <span className="text-gray-400 text-xs tracking-[0.3em] uppercase font-medium">Transformaciones</span>
          <h2 className="text-4xl md:text-5xl text-black mt-3 mb-4 font-light">
            <span className="font-bold">Remodelaciones</span>
          </h2>
          <div className="w-16 h-0.5 bg-black/10 mx-auto" />
          <p className="text-gray-400 mt-6 max-w-lg mx-auto text-sm">
            Descubre cómo transformamos espacios y creamos ambientes completamente nuevos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {remodelations.map((r, i) => (
            <div
              key={r.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 reveal-scale cursor-pointer"
              style={{ transitionDelay: `${i * 100}ms` }}
              onClick={() => setExpanded(expanded === r.id ? null : r.id)}
            >
              <div style={{ height: '288px', background: '#e5e7eb', position: 'relative', overflow: 'hidden' }}>
                {r.afterImageUrl && (
                  <img
                    src={r.afterImageUrl}
                    alt={r.title}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
                <div style={{ position: 'absolute', bottom: 16, right: 16, background: '#16a34a', color: 'white', fontSize: 12, padding: '6px 12px', borderRadius: 8 }}>
                  Después
                </div>
              </div>
              <div className="p-6">
                {r.category && (
                  <span className="inline-block text-xs font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full mb-3">
                    {r.category}
                  </span>
                )}
                <h3 className="text-black font-semibold text-lg mb-2 group-hover:text-gray-500 transition-colors duration-300">{r.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{r.description}</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-gray-400 group-hover:text-black/30 transition-colors duration-300">
                  <span>{expanded === r.id ? 'Ver menos' : 'Ver más'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-300 ${expanded === r.id ? 'rotate-90' : ''}`} />
                </div>
              </div>

              {expanded === r.id && (
                <div className="border-t border-gray-100 px-6 py-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <h4 className="text-sm font-semibold text-black mb-4">Comparativa: Antes &amp; Después</h4>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400 mb-2 block">Antes</span>
                      <div className="relative h-44 rounded-xl overflow-hidden bg-gray-100">
                        {r.beforeImageUrl ? (
                          <img
                            src={r.beforeImageUrl}
                            alt="Antes"
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) => { e.currentTarget.style.display = 'none' }}
                          />
                        ) : null}
                        {!r.beforeImageUrl && (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-medium uppercase tracking-wider text-green-600 mb-2 block">Después</span>
                      <div className="relative h-44 rounded-xl overflow-hidden bg-gray-100">
                        {r.afterImageUrl ? (
                          <img
                            src={r.afterImageUrl}
                            alt="Después"
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) => { e.currentTarget.style.display = 'none' }}
                          />
                        ) : null}
                        {!r.afterImageUrl && (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{r.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {remodelations.length === 0 && (
          <div className="text-center py-16">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-400 text-sm">Próximamente mostraremos nuestros proyectos de remodelación.</p>
          </div>
        )}
      </div>
    </section>
  )
}

function ChevronRight({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}
