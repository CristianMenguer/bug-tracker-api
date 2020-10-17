import Project from "./Project"

enum IssueStatus {
    OPEN = 'open',
    WIP = 'wip',
    BLOCKED = 'blocked',
    CLOSED = 'closed'
}

class Issue {
    _id: string
    title: string
    description: string
    status: IssueStatus
    project: Project
    number: number
    created_at: Date
    updated_at: Date

    issueNumber() {
        return this.project.slug + '-' + this.number
    }
}

export default Issue