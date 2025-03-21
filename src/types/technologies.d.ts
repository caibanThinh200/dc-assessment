export interface Technology {
  title: string
  description: string
  image: string
  url: string
  category: string
}

export interface TechnologyFilters {
  'no-throttling': boolean
  search?: string
}