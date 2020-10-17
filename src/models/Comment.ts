import Issue from "./Issue"
import User from "./User"

class Comment {
    _id: string
    title: string
    text: string
    issue: Issue
    user: User
    created_at: Date
    updated_at: Date
}

export default Comment