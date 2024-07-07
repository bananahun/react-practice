import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import TodoDetail from "./ToDoDetail";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/todos/:id" element={<TodoDetail />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);
