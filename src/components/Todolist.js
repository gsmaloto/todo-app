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
  const notCompletedTask = todos.filter((todo) => !todo.isCompleted);
  const completedTask = todos.filter((todo) => todo.isCompleted);

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
          {!notCompletedTask.length ? (
            <h4>-- Empty --</h4>
          ) : (
            notCompletedTask.map((todo) => (
              <TodoRow
                key={todo.id}
                todo={todo}
                handleCheck={handleCheck}
                deleteTask={deleteTask}
                openModal={openModal}
              />
            ))
          )}
        </div>

        <div className="todoList__completed">
          {completedTask.length !== 0 && <h3>Completed Todo</h3>}
          {completedTask &&
            completedTask.map((todo) => (
              <TodoRow
                key={todo.id}
                todo={todo}
                handleCheck={handleCheck}
                deleteTask={deleteTask}
                openModal={openModal}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Todolist;
