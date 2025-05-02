export type UserPayloadType = {
    username: string,
    email:string,
    password?:string,
    tech:string,
    uid?:string,
    role?:string,
    assignedTasks?: string[],
    completedTasks?:string[]
}