import { Todo } from "@/Types";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import { useState } from "react";

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    setTodos([
      ...todos,
      { id: todos.length + 1, text: text, status: "Backlog" },
    ]);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleStatus = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          switch (todo.status) {
            case "Backlog":
              return { ...todo, status: "In Progress" };
            case "In Progress":
              return { ...todo, status: "Complete" };
            case "Complete":
              return { ...todo, status: "Backlog" };
          }
        } else {
          return todo;
        }
      })
    );
  };

  return (
    <div className="container mx-auto mt-4 bg-indigo-500">
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        toggleStatus={toggleStatus}
      />
    </div>
  );
};

export default TodoPage;
