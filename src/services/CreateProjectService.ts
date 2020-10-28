import { hash } from 'bcryptjs'

import { getProjects, createNewProject } from '../models/project'
import Project from '../entities/Project'
import AppError from '../errors/AppError'

interface RequestDTO {
    slug: string
    name: string
    description: string
}

class CreateProjectService {
    public async execute({ slug, name, description }: RequestDTO): Promise<Project> {
        
        let projectFromDb = await getProjects({ slug })

        if (projectFromDb.length) {
            throw new AppError('Slug has already been registered!')
        }

        projectFromDb = await getProjects({ name })

        if (projectFromDb.length) {
            throw new AppError('Name has already been registered!')
        }

        const project = await createNewProject(new Project (
            slug,
            name,
            description
        ))

        return project
    }
}

export default CreateProjectService