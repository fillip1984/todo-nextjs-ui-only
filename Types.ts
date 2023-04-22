export type TodoStatus = "Backlog" | "In Progress" | "Complete";

export interface Todo {
  id: number;
  text: string;
  status: TodoStatus;
}
