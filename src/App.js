import './App.css';
import React from "react";
import { useState } from 'react';

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {

      // const todoEdit = todos.find((i) => i.id === editId);
      const todosUpdated = todos.map((t) =>
        t.id === editId.id ? (t = { id: t.id, todo }) : { id: t.id, todo: t.todo });
      setTodos(todosUpdated);
      setEditId(0);
      setTodo("");
      return;
    }

    if (todo !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      setTodo("");
    }
  };
  console.log("Todos: ", todos)

  const handleDelete = (id) => {
    const todoDel = todos.filter((to) => to.id !== id);
    setTodos([...todoDel]);
  };

  const handleEdit = (id) => {
    const todoEdit = todos.find((i) => i.id === id);
    setTodo(todoEdit.todo);
    setEditId(id);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>ToDo List App</h1>

        <form className="todoForm" onSubmit={handleSubmit}>
          <input type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)} />
          <button type='submit'> {editId ? "Edit" : "Go"} </button>
        </form>

        <ul className="allTodos">
          {todos.map((t, index) => (
            <li className="listTodo" key={index}>
              <span className='textTodos'>
                {t.todo}</span>
              <button onClick={() => { handleEdit(t.id) }}>Edit</button>
              <button onClick={() => { handleDelete(t.id) }}>Delete</button>
            </li>
          )
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
