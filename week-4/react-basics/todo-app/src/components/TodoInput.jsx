import PropTypes from "prop-types";

TodoInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

function TodoInput({ addTodo }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.elements.todoInput;
    const text = input.value.trim();

    if (text) {
      addTodo(text);
      input.value = "";
    }
  };

  return (
    <form className="input-container" onSubmit={handleSubmit}>
      <input
        type="text"
        name="todoInput"
        className="todoInput"
        placeholder="Enter a new task"
      />
      <button type="submit" className="addButton">
        Add
      </button>
    </form>
  );
}

export default TodoInput;
