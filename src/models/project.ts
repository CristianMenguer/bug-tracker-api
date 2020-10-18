import * as db from '../database'
import Project from '../entities/Project'

const COLLECTION = 'project'

export const createNewProject = async (project: Project): Promise<Project> => {
    const projectsCount = await db.count(COLLECTION)
    const results = await db.add(COLLECTION, project) as ProjectResponseInsert
    return results.ops[0]
}

export const getAll = async (): Promise<Project[]> => {

    const projects = await db.get(COLLECTION) as Project[]

    return projects

}

export const getBySlug = async (slug: string): Promise<Project> => {

    if (!slug)
        return new Promise<Project>((resolve) => resolve())

    const projects = await db.get(COLLECTION, { slug }) as Project[]

    return projects[0]
}

export const getByName = async (name: string): Promise<Project> => {

    if (!name)
        return new Promise<Project>((resolve) => resolve())

    const projects = await db.get(COLLECTION, { name }) as Project[]

    return projects[0]
}