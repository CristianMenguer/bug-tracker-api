import { hash } from 'bcryptjs'

import { getByTitleProject, createNewIssue, getByProject } from '../models/issue'
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

        const issueFromDb = await getByTitleProject(title, projectById)
        
        if (issueFromDb) 
            throw new AppError('Issue has already been registered!')
        
        const issueNumber = (await getByProject(projectById)).length

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