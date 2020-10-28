import { hash } from 'bcryptjs'

import { getIssues, createNewIssue } from '../models/issue'
import { getById } from '../models/project'
import Issue from '../entities/Issue'
import AppError from '../errors/AppError'
import Project from '../entities/Project'
import { IssueStatus } from '../constants/IssueStatus'

interface RequestDTO {
    title: string
    description: string
    status: string
    project: Project
}

class CreateIssueService {
    public async execute({ title, description,status, project }: RequestDTO): Promise<Issue> {
        
        const issuesFromDb = await getIssues({ project_id: project._id })
        
        if (issuesFromDb.filter(issue => issue.title == title) .length > 0)
            throw new AppError('Issue has already been registered!')
        
        const issueNumber = issuesFromDb.length

        const issue = await createNewIssue(new Issue (
            title,
            description,
            project,
            issueNumber + 1,
            status as IssueStatus
        ))

        return issue
    }
}

export default CreateIssueService