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
export interface ItemFromInvoice {
    id?: number
    category?: Category
    name?: string
    description?: string
    reference?: null
    status?: string
    calculationScale?: number
    price?: number
    tax?: []
    customFields?: []
    type?: string
    itemType?: null
    sellerId?: number
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

interface Address {
    address: string | null
    city: string | null
}

interface Client {
    id: string
    name: string
    identification: string
    phonePrimary: string | null
    phoneSecondary: string | null
    fax: string | null
    mobile: string | null
    email: string
    regime: string | null
    address: Address
}

interface Warehouse {
    id: string
    name: string
}

interface NumberTemplate {
    id: string
    prefix: string | null
    number: string
    text: string | null
    documentType: string
    fullNumber: string
    formattedNumber: string
}

interface PriceList {
    id: number
    name: string
}

interface PrintingTemplate {
    id: string
    name: string
    pageSize: string
}

export interface Invoice {
    id: string
    date: string
    dueDate: string
    datetime: string
    observations: string | null
    anotation: string | null
    termsConditions: string
    status: string
    client: Client
    numberTemplate: NumberTemplate
    subtotal: number
    discount: number
    tax: number
    total: number
    totalPaid: number
    balance: number
    decimalPrecision: string
    warehouse: Warehouse
    term: string
    seller: Seller
    priceList: PriceList
    items: ItemFromInvoice[]
    costCenter: string | null
    printingTemplate: PrintingTemplate
    isFirstInvoiceCreated: boolean
    isFirstDraftOrOpenInvoiceCreated: boolean
}
