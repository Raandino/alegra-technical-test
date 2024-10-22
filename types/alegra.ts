export interface Seller {
    id: number
    name: string
    identification: string | null
    observations: string | null
    status: string
    points?: number
}

interface Category {
    id: string
    name: string
}

interface Price {
    idPriceList?: number
    name?: string
    type?: string
    price: number
    currency?: {
        code: string
        symbol: string
    }
    main?: boolean
}

export interface Item {
    id?: number
    category?: Category
    name?: string
    description?: string
    reference?: null
    status?: string
    calculationScale?: number
    price?: Price[]
    tax?: []
    customFields?: []
    type?: string
    itemType?: null
    sellerId?: number
}

interface Currency {
    code: string
    symbol: string
}

export interface AuthResponse {
    token: string
    company: Company
    user: User
}

interface Company {
    id: string
    name: string
    identification: string | null
    phone: string | null
    website: string | null
}

interface User {
    id: string
    username: string | null
    name: string | null
    lastName: string | null
    email: string
    phone: string | null
}

interface Category {
    id: string
    name: string
}

interface Currency {
    code: string
    symbol: string
}
