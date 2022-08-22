import './App.css';
import Todolist from './components/Todolist';
import Form from './components/Form';
function App() {
  return (
    <div className="app">
      <h1 className='app__title'>Todo List</h1>
     <Form />
     <Todolist />
    </div>
  );
}

export default App;
