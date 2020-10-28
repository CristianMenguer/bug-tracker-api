import { IssueStatus } from "../constants/IssueStatus"
import Project from "./Project"

class Issue {
    _id?: string
    title: string
    description: string
    status: IssueStatus
    project?: Project
    project_id?: string
    number: number
    comments?: Comment[]
    created_at?: Date
    updated_at?: Date

    constructor(title: string, description: string, project: Project, number: number, status: IssueStatus = IssueStatus.OPEN) {
        this.title = title
        this.description = description
        this.status = status
        this.project = project
        this.project_id = this.project?._id

        this.number = number
        this.created_at = new Date()
        this.updated_at = new Date()
    }

    issueNumber() {
        return this.project?.slug + '-' + this.number
    }
}

export default Issue