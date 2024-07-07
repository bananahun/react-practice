import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ToDoDetail from "./ToDoDetail";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);

  const onChange = (event) => setToDo(event.target.value);

  const onSubmit = (event) => {
    event.preventDefault();
    if (toDo === "") {
      return;
    }
    setToDos((currentArray) => [
      ...currentArray,
      { id: Date.now(), text: toDo },
    ]);
    setToDo("");
  };

  const deleteToDo = (id) => {
    setToDos((currentArray) => currentArray.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>My To Do List {toDos.length}</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={toDo}
          type="text"
          placeholder="할 일을 입력해주세요"
        />
        <button>추가</button>
      </form>
      <ul>
        {toDos.map((item) => (
          <li key={item.id}>
            <Link to={`/todos/${item.id}`}>{item.text}</Link>
            <button onClick={() => deleteToDo(item.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
