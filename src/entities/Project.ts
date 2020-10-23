import Issue from "./Issue"

class Project {
    _id?: string
    slug: string
    name: string
    description: string
    issues?: Issue[]
    created_at?: Date
    updated_at?: Date

    constructor(slug: string, name: string, description: string) {
        this.slug = slug
        this.name = name
        this.description = description
        this.created_at = new Date()
        this.updated_at = new Date()
    }
}

export default Project