import { useState } from 'react'
import { useData, type Property } from '../context/DataContext'

const emptyForm = { title: '', price: '', location: '', bedrooms: 0, bathrooms: 0, houseSquareMeters: '', lotSquareMeters: '', description: '', garage: false }

export default function AdminProperties() {
  const { properties, addProperty, updateProperty, deleteProperty } = useData()
  const [editing, setEditing] = useState<Property | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [showForm, setShowForm] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value })
  }

  const openNew = () => { setForm(emptyForm); setEditing(null); setShowForm(true) }
  const openEdit = (p: Property) => {
    setForm({
      title: p.title,
      price: p.price,
      location: p.location,
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      houseSquareMeters: String(p.houseSquareMeters ?? ''),
      lotSquareMeters: String(p.lotSquareMeters ?? ''),
      description: p.description ?? '',
      garage: p.garage ?? false,
    })
    setEditing(p); setShowForm(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim() || !form.price.trim()) return
    const data = {
      ...form,
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      houseSquareMeters: form.houseSquareMeters ? Number(form.houseSquareMeters) : undefined,
      lotSquareMeters: form.lotSquareMeters ? Number(form.lotSquareMeters) : undefined,
    }
    if (editing) await updateProperty(editing.id, data)
    else await addProperty(data)
    setShowForm(false); setEditing(null)
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-white text-xl font-medium">Propiedades</h2>
          <p className="text-white/30 text-sm mt-1">{properties.length} propiedad{properties.length !== 1 ? 'es' : ''}</p>
        </div>
        <button onClick={openNew}
          className="flex items-center gap-2 bg-white text-black font-semibold px-5 py-2.5 rounded-xl text-sm transition-all hover:shadow-xl hover:shadow-white/10 cursor-pointer">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Nueva propiedad
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="title" placeholder="Título de la propiedad" value={form.title} onChange={handleChange} required
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all text-sm" />
            <input name="price" placeholder="Precio (ej: $2,850,000)" value={form.price} onChange={handleChange} required
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all text-sm" />
          </div>
          <input name="location" placeholder="Ubicación" value={form.location} onChange={handleChange} required
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all text-sm" />
          <textarea name="description" placeholder="Descripción" value={form.description} onChange={handleChange} rows={3}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all text-sm resize-none" />
          <div className="grid grid-cols-3 gap-4">
            <input name="bedrooms" type="number" placeholder="Recámaras" value={form.bedrooms} onChange={handleChange} min="0"
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-all text-sm" />
            <input name="bathrooms" type="number" placeholder="Baños" value={form.bathrooms} onChange={handleChange} min="0"
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-all text-sm" />
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
              <input type="checkbox" name="garage" checked={form.garage} onChange={handleChange} className="rounded" />
              <label className="text-white/60 text-sm">Garaje</label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input name="houseSquareMeters" type="number" placeholder="m² Casa" value={form.houseSquareMeters} onChange={handleChange} min="0"
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-all text-sm" />
            <input name="lotSquareMeters" type="number" placeholder="m² Lote" value={form.lotSquareMeters} onChange={handleChange} min="0"
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-all text-sm" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="bg-white text-black font-semibold px-6 py-2.5 rounded-xl text-sm transition-all hover:shadow-lg cursor-pointer">
              {editing ? 'Guardar cambios' : 'Crear propiedad'}
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
          <span>Propiedad</span><span>Precio</span><span className="text-right">Acciones</span>
        </div>
        {properties.map((p) => (
          <div key={p.id} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] px-6 py-4 items-center border-b border-white/5 hover:bg-white/5 transition-colors gap-2 md:gap-0">
            <div>
              <span className="md:hidden text-white/30 text-xs uppercase tracking-wider mr-2">Propiedad</span>
              <span className="text-white font-medium text-sm">{p.title}</span>
            </div>
            <div>
              <span className="md:hidden text-white/30 text-xs uppercase tracking-wider mr-2">Precio</span>
              <span className="text-white/70 font-semibold text-sm">{p.price}</span>
            </div>
            <div className="flex justify-end gap-2 mt-2 md:mt-0">
              <button onClick={() => openEdit(p)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                Editar
              </button>
              <button onClick={async () => { if (window.confirm('¿Eliminar esta propiedad?')) await deleteProperty(p.id) }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all cursor-pointer">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                Eliminar
              </button>
            </div>
          </div>
        ))}
        {properties.length === 0 && (
          <div className="text-center py-16">
            <svg className="w-12 h-12 text-white/20 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            <p className="text-white/30 text-sm">No hay propiedades aún.</p>
          </div>
        )}
      </div>
    </div>
  )
}
