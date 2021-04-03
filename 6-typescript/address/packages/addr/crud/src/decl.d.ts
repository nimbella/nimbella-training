export interface Record {
    name: string
    company: string
    phone: number
}

export interface Args extends Record {
    op?: string
}

export interface Result {
    data?: Record[]
    record?: Record
    status?: string
    error?: string
}
