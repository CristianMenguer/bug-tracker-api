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

        const projectFromDb = await getProjects({
            $or: [
                {
                    slug
                },
                {
                    name
                }
            ]
        })

        if (projectFromDb.length) {
            throw new AppError('Slug/Name has already been registered!')
        }

        try {
            const project = await createNewProject(new Project(
                slug,
                name,
                description
            ))

            return project
        } catch (err) {
            console.log('Error: > CreateProjectService > execute:')
            console.log(err)
            throw new AppError('Internal error. Please, try again!', 500)
        }
    }
}

export default CreateProjectService