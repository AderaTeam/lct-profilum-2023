export class CreateUserDto
{
    nickname: string
    username: string
    password: string
    role: "user" | "admin" 
    grade: "8" | "9" | "10" | "11" 
}
