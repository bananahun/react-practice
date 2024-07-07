import React from "react";
import { useParams } from "react-router-dom";

const TodoDetail = ({ todos }) => {
  const { id } = useParams();
  console.log(todos)
  // const todo = todos.find(todo => todo.id === parseInt(id));
  
  // if (!todo) {
  //   return <div>해당 할 일을 찾을 수 없습니다.</div>;
  // }

  return (
    <div>
      <h2>할 일 상세 페이지</h2>
      {todos}
    </div>
  );
};

export default TodoDetail;
