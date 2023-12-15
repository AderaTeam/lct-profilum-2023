import { CreatePathStepDto } from "./create-pathstep.dto"

export class CreatePathDto {
    id?: number
    name: string
    steps: CreatePathStepDto[]
}
