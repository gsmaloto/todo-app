import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { Container } from "./styles/GlobalStyles";
const TodoRow = ({
  todo,
  handleCheck,
  deleteTask,
  openModal,
  deletedId,
  setCheckedId,
}) => {
  return (
    <AnimatePresence>
      {deletedId != todo.id && (
        <motion.div
          transition={{ duration: 0.3 }}
          exit={{ height: 0, backgroundColor: "#C21010", opacity: 0 }}
          className={`todoRow`}
          key={todo.id}
        >
          <Container>
            <Row>
              <input
                type="checkbox"
                onChange={() => handleCheck(todo)}
                checked={todo.isCompleted && "checked"}
              />
              <p className="todoRow__task">{todo.task}</p>
              <div className="actions">
                <div className="action">
                  <DeleteIcon
                    color="error"
                    onClick={() => {
                      deleteTask(todo.id);
                    }}
                  />
                </div>
                <div className="action">
                  <EditIcon color="info" onClick={() => openModal(todo)} />
                </div>
              </div>
            </Row>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TodoRow;

const Row = styled.div`
  display: flex;
  align-items: center;
  &:hover {
    background-color: #c2101030;
  }
  input {
    margin: 0 1rem;
    cursor: pointer;

    &:hover {
      transform: scale(1.2);
    }
  }

  p {
    flex: 1;
  }

  .actions {
    margin: 0 1rem;
    display: flex;
    gap: 0.5rem;

    & > * {
      cursor: pointer;

      &:hover {
        transform: scale(1.2);
      }
    }
  }
`;
