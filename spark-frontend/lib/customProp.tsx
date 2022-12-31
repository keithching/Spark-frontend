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
    phone: string | null
    about: string | null
}

export interface EventCategoryProps {
    id: number
    name: string
}

export type JpRegionProps = string