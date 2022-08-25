import React, { useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import "./Form.css";

const Form = () => {

  const [input, setInput] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();
    addDoc(collection(db, "todos"), {
      task: input,
      isCompleted: false,
      timestamp: serverTimestamp(),
    });
    setInput("");
    
  };

  return (
    <div className="form">
      <h2>Add New Task</h2>
      <form>
        <label>Task</label>
        <input type="text" onChange={(e) => setInput(e.target.value)} value={input} />
        <button type="submit" onClick={handleAddTask} disabled={!input}>
          Add
        </button>
      </form>
    </div>
  );
};

export default Form;
