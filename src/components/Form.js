import React, { useState } from "react";
import { db } from "../firebase";
import {Container} from "./styles/GlobalStyles";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import styled from "styled-components";

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
    <FormContainer>
      <Container>
         <h2>Add New Todo</h2>
      <form>
        <label>Todo</label>
        <input placeholder="Enter Todo" type="text" onChange={(e) => setInput(e.target.value)} value={input} />
        <button type="submit" onClick={handleAddTask} disabled={!input}>
          Add
        </button>
      </form>
      </Container>
     
    </FormContainer>
  );
};
export default Form;


const FormContainer = styled.div`
  text-align: center;
  margin-top: 2rem;
  position: relative;
  


  h2 {
    margin-bottom: 1rem;
  }

  label {

  }

  input {
    margin: 0 .5rem;
    height: 30px;
    padding: 0 .5rem;
    border: 1px solid black;
    outline: none;

    &:focus {
     border: 2px solid #C21010;
    }
  }

  button {
    height: 30px;
    width: 60px;
    background-color: #C21010;
    color: white;
    cursor: pointer;
    border: none;

    &:disabled {
      opacity: .5;
    }
  }

`
