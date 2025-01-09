import { useState } from "react";
import "./App.css";
import { nanoid } from "nanoid";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  // State for managing todos
  const [todos, setTodos] = useState([]);

  // Function to add a new todo
  function addTodo(text) {
    const newTodo = {
      id: nanoid(),
      text: text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  }

  // Function to toggle todo completion status
  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  // Function to delete a todo
  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  // Render the todo application
  return (
    <div>
      <h1>Todo List</h1>
      <TodoInput addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
