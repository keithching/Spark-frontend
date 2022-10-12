export interface EventProps {
    id: number
    title: string
    eventProvider: string
    eventCategory: string
    location: string
    dateStart: string
    dateEnd: string
    imageURL: string | null
}

export interface EventProviderProps {
    id: number
    name: string
}

export interface EventCategoryProps {
    id: number
    name: string
}

export type JpRegionProps = string