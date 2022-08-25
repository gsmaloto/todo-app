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
import { animate, motion } from "framer-motion";

const Todolist = () => {
  const [todos, setTodos] = useState([]);
  const [deletedId, setDeletedId] = useState("");
  const notCompletedTask = todos.filter((todo) => !todo.isCompleted);
  const completedTask = todos.filter((todo) => todo.isCompleted);

  const getTodos = () => {
    const q = query(collection(db, "todos"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };
  useEffect(() => {
    //get realtime in firebase
    getTodos();
  }, []);

  const rowVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  };

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
    <div className="todoList">
      <div className="todoList__container">
        <div className="todoList__notCompleted">
          <h3>Ongoing Todo</h3>
          {!notCompletedTask.length && <h3>--- No Task ---</h3>}
          {todos.map(
            (todo, key) =>
              !todo.isCompleted && (
                <div>
                  <TodoRow
                    key={todo.id}
                    todo={todo}
                    handleCheck={handleCheck}
                    deleteTask={deleteTask}
                    openModal={openModal}
                    deletedId={deletedId}
                  />
                </div>
              )
          )}
        </div>

        <div className="todoList__completed">
        {completedTask.length ? <h3>Completed Todo</h3> : ''}
          {todos.map(
            (todo, key) =>
              todo.isCompleted && (
                <div transition={{ duration: 0.3, delay: key * 0.2 }}>
                  <TodoRow
                    key={todo.id}
                    todo={todo}
                    handleCheck={handleCheck}
                    deleteTask={deleteTask}
                    openModal={openModal}
                    deletedId={deletedId}
                  />
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Todolist;
