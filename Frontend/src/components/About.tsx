import { useData } from '../context/DataContext'

export default function About() {
  const { siteSettings } = useData()

  const paragraphs = [
    siteSettings.aboutParagraph1,
    siteSettings.aboutParagraph2,
    siteSettings.aboutParagraph3,
  ].filter(Boolean)

  const stats = [
    { value: siteSettings.statYears, label: siteSettings.statYearsLabel },
    { value: siteSettings.statProjects, label: siteSettings.statProjectsLabel },
    { value: siteSettings.statClients, label: siteSettings.statClientsLabel },
    { value: siteSettings.statTeam, label: siteSettings.statTeamLabel },
  ].filter((s) => s.value)

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

        {(paragraphs.length > 0 || stats.length > 0) && (
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            {paragraphs.length > 0 && (
              <div className="reveal-left space-y-5">
                {paragraphs.map((text) => (
                  <p key={text} className="text-gray-600 leading-relaxed">{text}</p>
                ))}
              </div>
            )}

            {stats.length > 0 && (
              <div className={`grid grid-cols-2 gap-5 reveal-right ${paragraphs.length === 0 ? 'md:col-span-2 max-w-2xl mx-auto w-full' : ''}`}>
                {stats.map((s) => (
                  <div key={s.label} className="group relative bg-white p-7 rounded-2xl text-center border border-gray-100 hover:border-gray-300 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                    <span className="block text-4xl text-black font-bold mb-1.5">{s.value}</span>
                    <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors duration-300">{s.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {siteSettings.quote && (
          <div className="relative reveal-scale">
            <div className="absolute inset-0 bg-gray-50 rounded-3xl" />
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 p-8 md:p-10 text-center">
              <p className="text-gray-500 text-lg italic font-light max-w-2xl mx-auto">
                "{siteSettings.quote}"
              </p>
              <div className="mt-4 w-10 h-0.5 bg-black/10 mx-auto" />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
