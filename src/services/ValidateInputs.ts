import { IssueStatus } from "../constants/IssueStatus"

export const isValidEmail = (email: string): boolean => {
    const format = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return format.test(String(email).toLowerCase())
}

export const isOnlyLetterLowerCase = (input: string): boolean => {
    const format = /^[a-z]+$/
    return format.test(input)
}

export const isNumber = (input: string): boolean => {
    const format = /^[0-9]+$/
    return format.test(input)
}

export const isIssueType = (input: string): boolean => {
    let result = false
    result = result || (input == IssueStatus.CLOSED)
    result = result || (input == IssueStatus.BLOCKED)
    result = result || (input == IssueStatus.OPEN)
    result = result || (input == IssueStatus.WIP)
    return result
}
