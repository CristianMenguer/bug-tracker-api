import * as db from '../database'
import Project from '../entities/Project'

const COLLECTION = 'project'
const LOOKUP_ISSUES_PIPELINE = [
    {
        $lookup: {
            from: 'issue',
            let: { projectId: '$_id' },
            pipeline: [
                { $match: { $expr: { $eq: ['$project_id', '$$projectId'] } } },

                {
                    $lookup: {
                        from: 'comment',
                        let: { issueId: '$_id' },
                        pipeline: [
                            { $match: { $expr: { $eq: ['$issue_id', '$$issueId'] } } }
                        ],
                        as: 'comments',
                    },
                }

            ],
            as: 'issues',

        },
    }
]

export const createNewProject = async (project: Project): Promise<Project> => {
    try {
        const results = await db.add(COLLECTION, project) as ProjectResponseInsert
        return results.ops[0]
    } catch (err) {
        console.log('Error: > project.model > createNewProject:')
        console.log(err)
        return {} as Project
    }
}

export const getProjects = async (query = {}): Promise<Project[]> => {
    try {
        // @ts-ignore
        const projects = await db.aggregate(COLLECTION, LOOKUP_ISSUES_PIPELINE, query) as Project[]
        return projects
    } catch (err) {
        console.log('Error: > project.model > getProjects:')
        console.log(err)
        return []
    }
}