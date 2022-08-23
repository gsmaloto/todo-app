import React from "react";
import "./TodoRow.css";

const TodoRow = ({ todo, handleCheck, deleteTask, openModal }) => {
  return (
      <div className="todoRow" key={todo.id} style={{ opacity: todo.isCompleted && ".6" }}>
        <input
          type="checkbox"
          onChange={() => handleCheck(todo)}
          checked={todo.isCompleted && "checked"}
        />
        <p
          className="todoRow__task"
          style={{
            textDecoration: todo.isCompleted && "line-through",
          }}
        >
          {todo.task}
        </p>
        <div className="todoRow__actions">
          <button
            onClick={() => {
              deleteTask(todo.id);
            }}
          >
            Delete
          </button>
          <button onClick={() => openModal()}>Update</button>
        </div>
      </div>
  );
};

export default TodoRow;
