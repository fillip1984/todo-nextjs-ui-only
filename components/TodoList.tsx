import { Todo } from "@/Types";

interface TodoListProps {
  todos: Todo[];
  deleteTodo: (id: number) => void;
  toggleStatus: (id: number) => void;
}

const TodoList = ({ todos, deleteTodo, toggleStatus }: TodoListProps) => {
  return (
    <div>
      <span>Todos: {todos.length}</span>
      <ul className="flex flex-col">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex p-1 items-center justify-between hover:bg-red-100">
            <span>{todo.text}</span>
            <div className="space-x-2">
              <button
                type="button"
                onClick={() => toggleStatus(todo.id)}
                className="bg-white text-indigo-300 rounded px-2 py-2">
                {todo.status}
              </button>
              <button
                type="button"
                onClick={() => deleteTodo(todo.id)}
                className="bg-indigo-300 text-white rounded px-4 py-2">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
