import { useData } from '../context/DataContext'

export default function Properties() {
  const { properties } = useData()

  return (
    <section id="properties" className="relative py-28 px-6 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <span className="text-gray-400 text-xs tracking-[0.3em] uppercase font-medium">En venta</span>
          <h2 className="text-4xl md:text-5xl text-black mt-3 mb-4 font-light">
            Propiedades <span className="font-bold">Destacadas</span>
          </h2>
          <div className="w-16 h-0.5 bg-black/10 mx-auto" />
          <p className="text-gray-400 mt-6 max-w-lg mx-auto text-sm">
            Descubre las mejores propiedades en venta. Tenemos la opción perfecta para ti.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((p, i) => (
            <div
              key={p.id}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500 hover:-translate-y-2 cursor-pointer reveal-scale"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 property-img transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-black text-sm font-bold px-3 py-1.5 rounded-lg shadow-sm">
                  {p.price}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-gray-500 transition-colors duration-300">{p.title}</h3>
                <p className="text-sm text-gray-400 mb-4 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {p.location}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {p.bedrooms > 0 && (
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                      {p.bedrooms} Rec
                    </span>
                  )}
                  {p.bathrooms > 0 && (
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      {p.bathrooms} Baños
                    </span>
                  )}
                  {p.houseSquareMeters && (
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                      {p.houseSquareMeters} m²
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
