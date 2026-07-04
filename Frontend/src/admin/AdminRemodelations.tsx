import { useState } from 'react'
import { useData, type Remodelation } from '../context/DataContext'

const emptyForm = { title: '', description: '', beforeImageUrl: '', afterImageUrl: '', category: '' }

export default function AdminRemodelations() {
  const { remodelations, addRemodelation, updateRemodelation, deleteRemodelation } = useData()
  const [editing, setEditing] = useState<Remodelation | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [showForm, setShowForm] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const openNew = () => { setForm(emptyForm); setEditing(null); setShowForm(true) }
  const openEdit = (r: Remodelation) => {
    setForm({
      title: r.title,
      description: r.description,
      beforeImageUrl: r.beforeImageUrl ?? '',
      afterImageUrl: r.afterImageUrl ?? '',
      category: r.category ?? '',
    })
    setEditing(r); setShowForm(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim() || !form.description.trim()) return
    const data = {
      ...form,
      beforeImageUrl: form.beforeImageUrl || undefined,
      afterImageUrl: form.afterImageUrl || undefined,
      category: form.category || undefined,
    }
    if (editing) await updateRemodelation(editing.id, data)
    else await addRemodelation(data)
    setShowForm(false); setEditing(null)
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-white text-xl font-medium">Remodelaciones</h2>
          <p className="text-white/30 text-sm mt-1">{remodelations.length} proyecto{remodelations.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={openNew}
          className="flex items-center gap-2 bg-white text-black font-semibold px-5 py-2.5 rounded-xl text-sm transition-all hover:shadow-xl hover:shadow-white/10 cursor-pointer">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Nueva remodelación
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="title" placeholder="Título del proyecto" value={form.title} onChange={handleChange} required
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all text-sm" />
            <input name="category" placeholder="Categoría (ej: Cocina, Baño)" value={form.category} onChange={handleChange}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-all text-sm" />
          </div>
          <textarea name="description" placeholder="Descripción del proyecto" value={form.description} onChange={handleChange} required rows={3}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all text-sm resize-none" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="beforeImageUrl" placeholder="URL imagen antes" value={form.beforeImageUrl} onChange={handleChange}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-all text-sm" />
            <input name="afterImageUrl" placeholder="URL imagen después" value={form.afterImageUrl} onChange={handleChange}
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-all text-sm" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="bg-white text-black font-semibold px-6 py-2.5 rounded-xl text-sm transition-all hover:shadow-lg cursor-pointer">
              {editing ? 'Guardar cambios' : 'Crear remodelación'}
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
        {remodelations.map((r) => (
          <div key={r.id} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] px-6 py-4 items-center border-b border-white/5 hover:bg-white/5 transition-colors gap-2 md:gap-0">
            <div>
              <span className="md:hidden text-white/30 text-xs uppercase tracking-wider mr-2">Proyecto</span>
              <span className="text-white font-medium text-sm">{r.title}</span>
            </div>
            <div>
              <span className="md:hidden text-white/30 text-xs uppercase tracking-wider mr-2">Categoría</span>
              <span className="text-white/40 text-sm">{r.category || 'Sin categoría'}</span>
            </div>
            <div className="flex justify-end gap-2 mt-2 md:mt-0">
              <button onClick={() => openEdit(r)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                Editar
              </button>
              <button onClick={async () => { if (window.confirm('¿Eliminar esta remodelación?')) await deleteRemodelation(r.id) }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all cursor-pointer">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                Eliminar
              </button>
            </div>
          </div>
        ))}
        {remodelations.length === 0 && (
          <div className="text-center py-16">
            <svg className="w-12 h-12 text-white/20 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <p className="text-white/30 text-sm">No hay remodelaciones aún.</p>
          </div>
        )}
      </div>
    </div>
  )
}
