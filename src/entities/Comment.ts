import Issue from "./Issue"
import User from "./User"

class Comment {
    _id?: string
    title: string
    text: string
    issue: Issue
    issue_id: string
    user_id: string
    user?: User
    number: number
    created_at: Date
    updated_at: Date

    constructor(title: string, text: string, issue: Issue, user_id: string, number: number) {
        this.title = title
        this.text = text
        this.issue = issue
        this.user_id = user_id
        this.number = number
        this.created_at = new Date()
        this.updated_at = new Date()
    }
}

export default Comment