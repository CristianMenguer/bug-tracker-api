import { IssueStatus } from "../constants/IssueStatus"
import Project from "./Project"

class Issue {
    _id?: string
    title: string
    description: string
    status: IssueStatus
    project: Project
    number: number
    created_at?: Date
    updated_at?: Date

    constructor(title: string, description: string, project: Project, number: number) {
        this.title = title
        this.description = description
        this.status = IssueStatus.OPEN
        this.project = project
        this.number = number
        this.created_at = new Date()
        this.updated_at = new Date()
    }

    issueNumber() {
        return this.project.slug + '-' + this.number
    }
}

export default Issue