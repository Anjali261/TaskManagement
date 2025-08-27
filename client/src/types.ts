export type User = {
    _id: string
    name: string
    email: string
    token?: string
    }
    
export type Task = {
    _id?: string
    user?: string
    title: string
    description: string
    status?: 'Pending' | 'Completed'
    createdAt?: string
    }