import * as db from '../database'
import Project from '../entities/Project'

const COLLECTION = 'project'
const LOOKUP_ISSUES_PIPELINE = [
    {
        $lookup: {
            from: 'issue',
            localField: '_id',
            foreignField: 'project_id',
            as: 'issues',
        }
    }
]

export const createNewProject = async (project: Project): Promise<Project> => {
    const results = await db.add(COLLECTION, project) as ProjectResponseInsert
    return results.ops[0]
}

export const getProjects = async (query = {}): Promise<Project[]> => {
    // @ts-ignore
    const projects = await db.aggregate(COLLECTION, LOOKUP_ISSUES_PIPELINE, query) as Project[]
    return projects
}