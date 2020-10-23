import { hash } from 'bcryptjs'

import { getIssues, createNewIssue } from '../models/issue'
import { getById } from '../models/project'
import Issue from '../entities/Issue'
import AppError from '../errors/AppError'

interface RequestDTO {
    title: string
    description: string
    project_id: string
}

class CreateIssueService {
    public async execute({ title, description, project_id }: RequestDTO): Promise<Issue> {
        
        const projectById = await getById(project_id)
        
        if (!projectById) 
            throw new AppError('Project not found!')

        const issuesFromDb = await getIssues({ project_id: projectById._id })
        
        if (issuesFromDb.filter(issue => issue.title == title) .length > 0)
            throw new AppError('Issue has already been registered!')
        
        const issueNumber = issuesFromDb.length

        const issue = await createNewIssue(new Issue (
            title,
            description,
            projectById,
            issueNumber + 1
        ))

        delete issue.project
        delete issue.created_at
        delete issue.updated_at

        return issue
    }
}

export default CreateIssueService