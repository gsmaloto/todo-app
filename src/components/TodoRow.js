import React from "react";
import "./TodoRow.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion, AnimatePresence } from "framer-motion";

const TodoRow = ({ todo, handleCheck, deleteTask, openModal, deletedId, setCheckedId }) => {
  return (
    <AnimatePresence>
      {deletedId != todo.id && (
        <motion.div
          transition={{ duration: 0.3 }}
          exit={{ height: 0, backgroundColor: "red", opacity: 0 }}
          className={`todoRow`}
          key={todo.id}
        >
          <input
            type="checkbox"
            onChange={() => handleCheck(todo)}
            checked={todo.isCompleted && "checked"}
          />
          <p
            className="todoRow__task"
          >
            {todo.task}
          </p>
          <div className="todoRow__actions">
            <div className="todoRow__action">
              <DeleteIcon
                color="error"
                onClick={() => {
                  deleteTask(todo.id);
                }}
              />
            </div>
            <div className="todoRow__action">
              <EditIcon color="info" onClick={() => openModal(todo)} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TodoRow;
