import { useState } from 'react'
import { useData, type Project } from '../context/DataContext'

const emptyForm = { title: '', category: '', description: '' }

export default function AdminPortfolio() {
  const { projects, addProject, updateProject, deleteProject } = useData()
  const [editing, setEditing] = useState<Project | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [showForm, setShowForm] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const openNew = () => { setForm(emptyForm); setEditing(null); setShowForm(true) }
  const openEdit = (p: Project) => {
    setForm({ title: p.title, category: p.category, description: p.description })
    setEditing(p); setShowForm(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim() || !form.description.trim()) return
    if (editing) updateProject(editing.id, form)
    else addProject(form)
    setShowForm(false); setEditing(null)
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-white text-xl font-medium">Portafolio</h2>
          <p className="text-white/30 text-sm mt-1">{projects.length} proyecto{projects.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={openNew}
          className="flex items-center gap-2 bg-white text-black font-semibold px-5 py-2.5 rounded-xl text-sm transition-all hover:shadow-xl hover:shadow-white/10 cursor-pointer">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Nuevo proyecto
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="title" placeholder="Título del proyecto" value={form.title} onChange={handleChange} required
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all text-sm" />
            <select name="category" value={form.category} onChange={handleChange} required
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-white/40 transition-all text-sm">
              <option value="" className="bg-black">Categoría</option>
              {['Residencial', 'Comercial', 'Industrial', 'Hotelero', 'Otro'].map(c => (
                <option key={c} className="bg-black">{c}</option>
              ))}
            </select>
          </div>
          <textarea name="description" placeholder="Descripción del proyecto" value={form.description} onChange={handleChange} required rows={3}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all text-sm resize-none" />
          <div className="flex gap-3 pt-2">
            <button type="submit" className="bg-white text-black font-semibold px-6 py-2.5 rounded-xl text-sm transition-all hover:shadow-lg cursor-pointer">
              {editing ? 'Guardar cambios' : 'Crear proyecto'}
            </button>
            <button type="button" onClick={() => setShowForm(false)}
              className="px-6 py-2.5 rounded-xl border border-white/10 text-white/40 text-sm hover:text-white hover:bg-white/5 transition-all cursor-pointer">
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden">
        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] px-6 py-4 border-b border-white/5 text-white/30 text-xs uppercase tracking-wider">
          <span>Proyecto</span><span>Categoría</span><span className="text-right">Acciones</span>
        </div>
        {projects.map((p) => (
          <div key={p.id} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] px-6 py-4 items-center border-b border-white/5 hover:bg-white/5 transition-colors gap-2 md:gap-0">
            <div>
              <span className="md:hidden text-white/30 text-xs uppercase tracking-wider mr-2">Proyecto</span>
              <span className="text-white font-medium text-sm">{p.title}</span>
            </div>
            <div>
              <span className="md:hidden text-white/30 text-xs uppercase tracking-wider mr-2">Categoría</span>
              <span className="text-white/40 text-sm">{p.category}</span>
            </div>
            <div className="flex justify-end gap-2 mt-2 md:mt-0">
              <button onClick={() => openEdit(p)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                Editar
              </button>
              <button onClick={() => { if (window.confirm('¿Eliminar este proyecto?')) deleteProject(p.id) }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all cursor-pointer">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                Eliminar
              </button>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="text-center py-16">
            <svg className="w-12 h-12 text-white/20 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            <p className="text-white/30 text-sm">No hay proyectos aún.</p>
          </div>
        )}
      </div>
    </div>
  )
}
