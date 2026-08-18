export type Task = {
  id: number
  title: string
  user: string
}

export type BoardColumn = {
  title: string
  tasks: Task[]
}