import Todolist from "./components/Todolist";
import Form from "./components/Form";
import "./App.css";
import styled from "styled-components";
function App() {
  return (
    <div className="app">
      <Title className="app__title">Todo List</Title>
      <Form />
      <Todolist />
    </div>
  );
}

export default App;

const Title = styled.h1`
  background-color: #C21010;
  color: #FFFDE3;
  text-align: center;
  padding: 1rem;

`;
