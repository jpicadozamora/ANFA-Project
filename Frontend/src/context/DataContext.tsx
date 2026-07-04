import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

const API = 'http://localhost:3000/api'

async function fetchJson<T>(url: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch {
    return fallback
  }
}

export interface Project {
  id: number
  title: string
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

export interface SiteSettings {
  id: number
  address: string
  phone: string
  email: string
  schedule: string
  aboutParagraph1: string
  aboutParagraph2: string
  aboutParagraph3: string
  quote: string
  statYears: string
  statYearsLabel: string
  statProjects: string
  statProjectsLabel: string
  statClients: string
  statClientsLabel: string
  statTeam: string
  statTeamLabel: string
}

const emptySiteSettings: SiteSettings = {
  id: 0,
  address: '',
  phone: '',
  email: '',
  schedule: '',
  aboutParagraph1: '',
  aboutParagraph2: '',
  aboutParagraph3: '',
  quote: '',
  statYears: '',
  statYearsLabel: 'Años de experiencia',
  statProjects: '',
  statProjectsLabel: 'Proyectos entregados',
  statClients: '',
  statClientsLabel: 'Clientes satisfechos',
  statTeam: '',
  statTeamLabel: 'Colaboradores',
}

interface DataContextType {
  projects: Project[]
  properties: Property[]
  remodelations: Remodelation[]
  siteSettings: SiteSettings
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
  updateSiteSettings: (s: Partial<SiteSettings>) => Promise<void>
  refreshAll: () => Promise<void>
}

const DataContext = createContext<DataContextType | null>(null)

export function DataProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [properties, setProperties] = useState<Property[]>([])
  const [remodelations, setRemodelations] = useState<Remodelation[]>([])
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(emptySiteSettings)
  const [loading, setLoading] = useState(true)

  const fetchProjects = () =>
    fetchJson<Project[]>(`${API}/projects`, []).then(setProjects)

  const fetchProperties = () =>
    fetchJson<Property[]>(`${API}/properties`, []).then(setProperties)

  const fetchRemodelations = () =>
    fetchJson<Remodelation[]>(`${API}/remodelations`, []).then(setRemodelations)

  const fetchSiteSettings = () =>
    fetchJson<SiteSettings>(`${API}/site`, emptySiteSettings).then(setSiteSettings)

  const refreshAll = async () => {
    await Promise.all([
      fetchProjects(),
      fetchProperties(),
      fetchRemodelations(),
      fetchSiteSettings(),
    ])
  }

  useEffect(() => {
    refreshAll().finally(() => setLoading(false))
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

  const updateSiteSettings = async (s: Partial<SiteSettings>) => {
    const res = await fetch(`${API}/site`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(s),
    })
    if (res.ok) fetchSiteSettings()
  }

  return (
    <DataContext.Provider
      value={{
        projects,
        properties,
        remodelations,
        siteSettings,
        loading,
        addProject,
        updateProject,
        deleteProject,
        addProperty,
        updateProperty,
        deleteProperty,
        addRemodelation,
        updateRemodelation,
        deleteRemodelation,
        updateSiteSettings,
        refreshAll,
      }}
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
