import React, { useEffect, useState } from "react";
import "./Todolist.css";
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

const Todolist = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    //get realtime in firebase
    const q = query(collection(db, "todos"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    // todos.map((todo) => console.log(todo.isCompleted));
  }, []);

  // Delete todo
  const deleteTask = async (id, isCompleted) => {
    try {
      alert("task deleted");
      await deleteDoc(doc(db, "todos", id));
    } catch (e) {
      alert(e.message);
    }
  };

  const handleCheck = async (todo) => {
    try {
      await updateDoc(doc(db, "todos", todo.id), {
        isCompleted: !todo.isCompleted,
      });
    } catch (e) {
      alert(e.meesge);
    }
  };
  const openModal = () => {
    alert("modal open");
  };

  return (
    <div className="todoList">
      <div className="todoList__container">
        <div className="todoList__notCompleted">
          {todos.map(
            (todo) =>
              !todo.isCompleted && (
                <TodoRow
                  todo={todo}
                  handleCheck={handleCheck}
                  deleteTask={deleteTask}
                />
              )
          )}
        </div>

        <div className="todoList__notCompleted">
          {todos.map(
            (todo) =>
              todo.isCompleted && (
                <TodoRow
                  todo={todo}
                  handleCheck={handleCheck}
                  deleteTask={deleteTask}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Todolist;
