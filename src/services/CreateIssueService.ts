import { getIssues, createNewIssue } from '../models/issue'
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
        
        const issuesByProject = await getIssues({ project_id: project._id })
        
        if (issuesByProject.filter(issue => issue.title == title).length > 0)
            throw new AppError('Issue (Title) has already been registered!')
        
        const issueNumber = issuesByProject.length

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