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
} from "firebase/firestore";

const Todolist = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "todos"), orderBy("timestamp", 'desc'))
    onSnapshot(q, (snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  // Delete todo
  const deleteTask = async (id) => {
    alert("task deleted");
    await deleteDoc(doc(db, "todos", id));
  };
  return (
    <div className="todoList">
      <div className="todoList__container">
        {!todos.length ? (
          <h3>---You dont have a task---</h3>
        ) : (
          todos.map((todo, index) => (
            <div className="todoList__row" key={index}>
              <p className="todoList__task">{todo.task}</p>
              <div className="todoList__actions">
                <button
                  onClick={() => {
                    deleteTask(todo.id);
                  }}
                >
                  Delete
                </button>
                <button>Update</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Todolist;
