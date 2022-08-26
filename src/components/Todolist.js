import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import TodoRow from "./TodoRow";
import { Container } from "./styles/GlobalStyles";
import styled from "styled-components";

const Todolist = () => {
  const [todos, setTodos] = useState([]);
  const [rowCount, setRowCount] = useState(5);
  const [deletedId, setDeletedId] = useState("");
  const notCompletedTask = todos.filter((todo) => !todo.isCompleted);
  const completedTask = todos.filter((todo) => todo.isCompleted);

  //get realtime in firebase
  const getTodos = () => {
    const q = query(collection(db, "todos"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };
  useEffect(() => {
    getTodos();
  }, []);

  // Delete todo
  const deleteTask = async (id) => {
    try {
      setDeletedId(id);
      await setTimeout(() => deleteDoc(doc(db, "todos", id)), 300);
    } catch (e) {
      alert(e.message);
    }
  };
  const handleCheck = async (todo) => {
    try {
      await updateDoc(
        doc(db, "todos", todo.id),
        {
          isCompleted: !todo.isCompleted,
        },
        600
      );
    } catch (e) {
      alert(e.meesge);
    }
  };
  const openModal = async (todo) => {
    const input = prompt("Edit task");
    try {
      input &&
        (await updateDoc(doc(db, "todos", todo.id), {
          task: input,
        }));
    } catch (e) {
      alert(e.meesge);
    }
  };

  return (
    <Container>
      <TodoContainer>
        <Column>
          <h3>Ongoing Todo</h3>
          {!notCompletedTask.length && <h4>--- No Todo ---</h4>}

          {notCompletedTask.map((todo, key) => (
            <Row colored={key % 2 && true}>
              <TodoRow
                key={todo.id}
                todo={todo}
                handleCheck={handleCheck}
                deleteTask={deleteTask}
                openModal={openModal}
                deletedId={deletedId}
              />
            </Row>
          ))}
          {notCompletedTask.length > 0 && (
            <p className="rowTotal">
              ----- {notCompletedTask.length}
              {notCompletedTask.length == 1 ? " item" : " items"} -----
            </p>
          )}
        </Column>
        <Column hide={!completedTask.length ? true : false}>
          {completedTask.length ? <h3>Completed Todo</h3> : ""}
          {completedTask.map((todo, key) => (
            <Row colored={key % 2 && true}>
              <TodoRow
                key={todo.id}
                todo={todo}
                handleCheck={handleCheck}
                deleteTask={deleteTask}
                openModal={openModal}
                deletedId={deletedId}
              />
            </Row>
          ))}
          {completedTask.length != 0 && (
            <p className="rowTotal">
              ------ {completedTask.length}
              {completedTask.length == 1 ? " item" : " items"} -----
            </p>
          )}
        </Column>
      </TodoContainer>
    </Container>
  );
};

export default Todolist;

const TodoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 2rem;
`;
const Column = styled.div`
  display: ${(props) => (props.hide ? "none" : "block")};
  border: 3px solid #c21010;
  position: relative;
  padding: 1rem 0;
  width: 300px;
  height: auto;
  h3 {
    position: absolute;
    top: -15px;
    left: 10px;
    padding: 0 1rem;
    background-color: white;
  }
  h4 {
    opacity: 0.5;
    text-align: center;
  }
  .rowTotal {
    text-align: center;
    opacity: 0.7;
  }
`;
const Row = styled.div`
  background-color: ${(props) => (props.colored ? "#00000020" : "white")};
`;
const ColumnFooter = styled.div`
  display: ${(props) => (props.hide ? "none" : "block")};
`;

const FooterButton = styled.button`
  transform: ${(props) => (props.hide ? "scale(0)" : "scale(1)")};
`;
