export class CreateCardDto {
    title: string
    status: "completed" | "app"
    author_id: number
    path_id?: number
}
