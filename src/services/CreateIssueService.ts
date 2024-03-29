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
    daysDueDate: number
}

class CreateIssueService {
    public async execute({ title, description, status, project, daysDueDate }: RequestDTO): Promise<Issue> {

        const issuesByProject = await getIssues({ project_id: project._id })

        if (issuesByProject.filter(issue => issue.title == title).length > 0)
            throw new AppError('Issue (Title) has already been registered!')

        const issueNumber = issuesByProject.length

        try {
            const issue = await createNewIssue(new Issue(
                title,
                description,
                project,
                issueNumber + 1,
                status as IssueStatus,
                daysDueDate
            ))

            return issue
        } catch (err) {
            console.log('Error: > CreateIssueService > execute:')
            console.log(err)
            throw new AppError('Internal error. Please, try again!', 500)
        }
    }
}

export default CreateIssueService