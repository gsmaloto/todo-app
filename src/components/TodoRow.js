import React from "react";
import "./TodoRow.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TodoRow = ({ todo, handleCheck, deleteTask, openModal, deletedId }) => {
  return (
    // ${!deleted ? "animDelete" : ""}
    <div
      className={`todoRow ${deletedId == todo.id && "animDelete"}`}
      key={todo.id}
      style={{ opacity: todo.isCompleted && ".6" }}
    >
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
        <div className="todoRow__action">
          <DeleteIcon color="error" onClick={() => {deleteTask(todo.id) }}
          />
        </div>
        <div className="todoRow__action">
          <EditIcon color="info" onClick={() => openModal(todo)} />
        </div>
      </div>
    </div>
  );
};

export default TodoRow;
