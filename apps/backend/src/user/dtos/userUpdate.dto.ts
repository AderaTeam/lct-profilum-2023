export class UserUpdateDto
{
    email?: string
    username?: string
    password?: string
    role?: "admin" | "user"
    type?: string
    isPlan?: boolean
    refreshToken?: string
}
