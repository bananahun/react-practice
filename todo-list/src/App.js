import React, { useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import './styles.css'; 

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const createTodo = (text) => ({
    id: uuidv4(),
    text,
    completed: false
  });

  const addTodo = () => {
    if (todo.trim() !== "") {
      const newTodo = createTodo(todo);
      setTodos([...todos, newTodo]);
      setTodo("");
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="container">
      <h1>할 일 목록</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="새 할 일을 입력하세요"
        />
        <button onClick={addTodo}>추가</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? "line-through" : "none"
            }}
          >
            <Link to={{ pathname: `/todo/${todo.id}`, state: { todos } }}>
              {todo.text}
            </Link>
            <button onClick={() => deleteTodo(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
