import { updateIssueStatus } from '../models/issue'
import Issue from '../entities/Issue'
import AppError from '../errors/AppError'
import { IssueStatus } from '../constants/IssueStatus'

interface RequestDTO {
    issue: Issue
    newStatus: IssueStatus
}

class UpdateIssueStatusService {
    public async execute({ issue, newStatus }: RequestDTO): Promise<Issue> {
        
        if (!issue._id)
            throw new AppError('Internal error. Try again, please!')

        const updatedIssue = await updateIssueStatus(issue._id, newStatus)

        return updatedIssue
    }
}

export default UpdateIssueStatusService