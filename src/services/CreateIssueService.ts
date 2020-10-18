import { hash } from 'bcryptjs'

import { getBySlug, getByName, createNewProject } from '../models/project'
import Project from '../entities/Project'
import AppError from '../errors/AppError'

interface RequestDTO {
    slug: string
    name: string
    description: string
}

class CreateIssueService {
    public async execute({ slug, name, description }: RequestDTO): Promise<Project> {
        
        let projectFromDb = await getBySlug(slug)

        if (projectFromDb) {
            throw new AppError('Slug has already been registered!')
        }

        projectFromDb = await getByName(name)

        if (projectFromDb) {
            throw new AppError('Name has already been registered!')
        }

        const project = await createNewProject(new Project (
            slug,
            name,
            description
        ))

        delete project.created_at
        delete project.updated_at

        return project
    }
}

export default CreateIssueService