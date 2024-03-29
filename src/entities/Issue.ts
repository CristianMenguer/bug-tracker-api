import { IssueStatus } from "../constants/IssueStatus"
import Project from "./Project"
import Comment from "./Comment"

class Issue {
    _id?: string
    title: string
    description: string
    status: IssueStatus
    project?: Project
    project_id?: string
    number: number
    comments?: Comment[]
    due_date: Date
    created_at?: Date
    updated_at?: Date

    constructor(title: string, description: string, project: Project, number: number, status: IssueStatus = IssueStatus.OPEN, daysDueDate: number = 7) {
        this.title = title
        this.description = description
        this.status = status
        this.project = project
        this.project_id = this.project?._id

        this.number = number
        let dueDate = new Date()
        dueDate.setDate(dueDate.getDate() + daysDueDate)
        this.due_date = dueDate
        this.created_at = new Date()
        this.updated_at = new Date()
    }
}

export default Issue