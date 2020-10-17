enum UserType {
    ADMIN = 'admin',
    USER = 'user'
}

class User {
    _id: string
    name: string
    username: string
    email: string
    password: string
    usertype: UserType
    created_at: Date
    updated_at: Date
}

export default User