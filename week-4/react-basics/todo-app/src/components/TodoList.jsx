import PropTypes from "prop-types";

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  toggleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id} className="todo-item">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span className={todo.completed ? "completed" : ""}>{todo.text}</span>
          <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
