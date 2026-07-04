import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

const API = 'http://localhost:3000/api'

export interface Project {
  id: number
  title: string
  category: string
  description: string
  squareMeters?: number
  rooms?: number
  bathrooms?: number
  garage?: boolean
}

export interface Property {
  id: number
  title: string
  description: string
  location: string
  price: string
  bedrooms: number
  bathrooms: number
  houseSquareMeters?: number
  lotSquareMeters?: number
  garage?: boolean
}

export interface Remodelation {
  id: number
  title: string
  description: string
  beforeImageUrl?: string
  afterImageUrl?: string
  category?: string
}

interface DataContextType {
  projects: Project[]
  properties: Property[]
  remodelations: Remodelation[]
  loading: boolean
  addProject: (p: Omit<Project, 'id'>) => Promise<void>
  updateProject: (id: number, p: Partial<Project>) => Promise<void>
  deleteProject: (id: number) => Promise<void>
  addProperty: (p: Omit<Property, 'id'>) => Promise<void>
  updateProperty: (id: number, p: Partial<Property>) => Promise<void>
  deleteProperty: (id: number) => Promise<void>
  addRemodelation: (p: Omit<Remodelation, 'id'>) => Promise<void>
  updateRemodelation: (id: number, p: Partial<Remodelation>) => Promise<void>
  deleteRemodelation: (id: number) => Promise<void>
}

const DataContext = createContext<DataContextType | null>(null)

export function DataProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [properties, setProperties] = useState<Property[]>([])
  const [remodelations, setRemodelations] = useState<Remodelation[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProjects = () =>
    fetch(`${API}/projects`).then(r => r.json()).then(setProjects)

  const fetchProperties = () =>
    fetch(`${API}/properties`).then(r => r.json()).then(setProperties)

const fetchRemodelations = () =>
  fetch(`${API}/remodelations`)
    .then(r => {
      console.log('FETCH REMODELATIONS RESPONSE:', r.status, r.ok)
      if (!r.ok) throw new Error(`HTTP ${r.status}`)
      return r.json()
    })
    .then(data => {
      console.log('FETCH REMODELATIONS DATA:', data)
      setRemodelations(data)
    })
    .catch(err => console.error('Error fetching remodelations:', err))

  useEffect(() => {
    Promise.all([fetchProjects(), fetchProperties(), fetchRemodelations()]).finally(() => setLoading(false))
  }, [])

  const addProject = async (p: Omit<Project, 'id'>) => {
    const res = await fetch(`${API}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(p),
    })
    if (res.ok) fetchProjects()
  }

  const updateProject = async (id: number, p: Partial<Project>) => {
    const res = await fetch(`${API}/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(p),
    })
    if (res.ok) fetchProjects()
  }

  const deleteProject = async (id: number) => {
    const res = await fetch(`${API}/projects/${id}`, { method: 'DELETE' })
    if (res.ok) fetchProjects()
  }

  const addProperty = async (p: Omit<Property, 'id'>) => {
    const res = await fetch(`${API}/properties`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(p),
    })
    if (res.ok) fetchProperties()
  }

  const updateProperty = async (id: number, p: Partial<Property>) => {
    const res = await fetch(`${API}/properties/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(p),
    })
    if (res.ok) fetchProperties()
  }

  const deleteProperty = async (id: number) => {
    const res = await fetch(`${API}/properties/${id}`, { method: 'DELETE' })
    if (res.ok) fetchProperties()
  }

  const addRemodelation = async (p: Omit<Remodelation, 'id'>) => {
    const res = await fetch(`${API}/remodelations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(p),
    })
    if (res.ok) fetchRemodelations()
  }

  const updateRemodelation = async (id: number, p: Partial<Remodelation>) => {
    const res = await fetch(`${API}/remodelations/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(p),
    })
    if (res.ok) fetchRemodelations()
  }

  const deleteRemodelation = async (id: number) => {
    const res = await fetch(`${API}/remodelations/${id}`, { method: 'DELETE' })
    if (res.ok) fetchRemodelations()
  }

  return (
    <DataContext.Provider
      value={{ projects, properties, remodelations, loading, addProject, updateProject, deleteProject, addProperty, updateProperty, deleteProperty, addRemodelation, updateRemodelation, deleteRemodelation }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be inside DataProvider')
  return ctx
}