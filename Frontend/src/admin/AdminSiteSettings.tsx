import { useState, useEffect } from 'react'
import { useData, type SiteSettings } from '../context/DataContext'

export default function AdminSiteSettings() {
  const { siteSettings, updateSiteSettings } = useData()
  const [form, setForm] = useState<SiteSettings>(siteSettings)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setForm(siteSettings)
  }, [siteSettings])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const { id: _, ...data } = form
    await updateSiteSettings(data)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const field = (name: keyof SiteSettings, placeholder: string, rows?: number) =>
    rows ? (
      <textarea name={name} placeholder={placeholder} value={form[name] as string} onChange={handleChange} rows={rows}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all text-sm resize-none" />
    ) : (
      <input name={name} placeholder={placeholder} value={form[name] as string} onChange={handleChange}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all text-sm" />
    )

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-white text-xl font-medium">Configuración del sitio</h2>
        <p className="text-white/30 text-sm mt-1">Contacto, nosotros y estadísticas que aparecen en la página pública.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-8">
        <section className="space-y-4">
          <h3 className="text-white/50 text-xs uppercase tracking-wider">Contacto</h3>
          {field('address', 'Dirección')}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {field('phone', 'Teléfono')}
            {field('email', 'Correo electrónico')}
          </div>
          {field('schedule', 'Horario', 2)}
        </section>

        <section className="space-y-4">
          <h3 className="text-white/50 text-xs uppercase tracking-wider">Sobre nosotros</h3>
          {field('aboutParagraph1', 'Párrafo 1', 3)}
          {field('aboutParagraph2', 'Párrafo 2', 3)}
          {field('aboutParagraph3', 'Párrafo 3', 3)}
          {field('quote', 'Frase destacada')}
        </section>

        <section className="space-y-4">
          <h3 className="text-white/50 text-xs uppercase tracking-wider">Estadísticas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {field('statYears', 'Ej: 15+')}
            {field('statYearsLabel', 'Etiqueta años')}
            {field('statProjects', 'Ej: 200+')}
            {field('statProjectsLabel', 'Etiqueta proyectos')}
            {field('statClients', 'Ej: 98%')}
            {field('statClientsLabel', 'Etiqueta clientes')}
            {field('statTeam', 'Ej: 50+')}
            {field('statTeamLabel', 'Etiqueta colaboradores')}
          </div>
        </section>

        <button type="submit" className="bg-white text-black font-semibold px-6 py-2.5 rounded-xl text-sm transition-all hover:shadow-lg cursor-pointer">
          {saved ? '✓ Guardado' : 'Guardar configuración'}
        </button>
      </form>
    </div>
  )
}
