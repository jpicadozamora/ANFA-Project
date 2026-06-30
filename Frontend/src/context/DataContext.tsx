import { createContext, useContext, useState, type ReactNode } from 'react'

export interface Project {
  id: string
  title: string
  category: string
  description: string
}

export interface Property {
  id: string
  title: string
  price: string
  location: string
  beds: number
  baths: number
  area: string
}

interface DataContextType {
  projects: Project[]
  properties: Property[]
  addProject: (p: Omit<Project, 'id'>) => void
  updateProject: (id: string, p: Omit<Project, 'id'>) => void
  deleteProject: (id: string) => void
  addProperty: (p: Omit<Property, 'id'>) => void
  updateProperty: (id: string, p: Omit<Property, 'id'>) => void
  deleteProperty: (id: string) => void
}

const DataContext = createContext<DataContextType | null>(null)

function load<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function save<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data))
}

let nextId = 100

function genId() {
  return String(++nextId)
}

const defaultProjects: Project[] = [
  { id: genId(), title: 'Residencial Los Alamos', category: 'Residencial', description: 'Conjunto de 12 viviendas unifamiliares con acabados de lujo.' },
  { id: genId(), title: 'Edificio Corporativo Norte', category: 'Comercial', description: 'Torre de oficinas de 8 pisos con certificación sustentable.' },
  { id: genId(), title: 'Plaza Comercial del Lago', category: 'Comercial', description: 'Centro comercial con 30 locales y área de restaurantes.' },
  { id: genId(), title: 'Complejo Industrial Delta', category: 'Industrial', description: 'Nave industrial de 5,000 m² con tecnología de punta.' },
  { id: genId(), title: 'Residencial Vista Hermosa', category: 'Residencial', description: 'Fraccionamiento con 45 casas, áreas verdes y alberca.' },
  { id: genId(), title: 'Hotel Boutique Mirador', category: 'Hotelero', description: 'Hotel de 20 habitaciones con diseño arquitectónico moderno.' },
]

const defaultProperties: Property[] = [
  { id: genId(), title: 'Casa en Venta - Los Alamos', price: '$2,850,000', location: 'Col. Los Alamos, CP 45000', beds: 4, baths: 3, area: '320 m²' },
  { id: genId(), title: 'Departamento - Centro', price: '$1,650,000', location: 'Av. Juárez 123, Centro', beds: 3, baths: 2, area: '180 m²' },
  { id: genId(), title: 'Terreno Industrial', price: '$4,200,000', location: 'Zona Industrial Norte', beds: 0, baths: 0, area: '2,500 m²' },
  { id: genId(), title: 'Casa Campestre', price: '$3,800,000', location: 'Carretera a Chapala km 5', beds: 5, baths: 4, area: '450 m²' },
  { id: genId(), title: 'Local Comercial', price: '$950,000', location: 'Plaza del Lago, Local 8', beds: 0, baths: 1, area: '85 m²' },
  { id: genId(), title: 'Residencia Premium', price: '$6,500,000', location: 'Col. Las Fuentes', beds: 6, baths: 5, area: '600 m²' },
]

export function DataProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(() => load('anfa_projects', defaultProjects))
  const [properties, setProperties] = useState<Property[]>(() => load('anfa_properties', defaultProperties))

  const persistProjects = (p: Project[]) => {
    setProjects(p)
    save('anfa_projects', p)
  }

  const persistProperties = (p: Property[]) => {
    setProperties(p)
    save('anfa_properties', p)
  }

  const addProject = (p: Omit<Project, 'id'>) =>
    persistProjects([...projects, { ...p, id: genId() }])

  const updateProject = (id: string, p: Omit<Project, 'id'>) =>
    persistProjects(projects.map((x) => (x.id === id ? { ...p, id } : x)))

  const deleteProject = (id: string) =>
    persistProjects(projects.filter((x) => x.id !== id))

  const addProperty = (p: Omit<Property, 'id'>) =>
    persistProperties([...properties, { ...p, id: genId() }])

  const updateProperty = (id: string, p: Omit<Property, 'id'>) =>
    persistProperties(properties.map((x) => (x.id === id ? { ...p, id } : x)))

  const deleteProperty = (id: string) =>
    persistProperties(properties.filter((x) => x.id !== id))

  return (
    <DataContext.Provider
      value={{ projects, properties, addProject, updateProject, deleteProject, addProperty, updateProperty, deleteProperty }}
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
