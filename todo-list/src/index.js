import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import ToDoDetail from "./ToDoDetail";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/todos/:id" element={<ToDoDetail />} />
    </Routes>
  </Router>
);
