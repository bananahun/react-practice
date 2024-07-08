import React from "react";
import { useParams, useLocation } from "react-router-dom";

const TodoDetail = () => {
  const { id } = useParams();
  const location = useLocation();

  // location.state에서 todos를 가져옴. 없으면 빈 배열로 초기화
  const { todos = [] } = location.state || {};

  // 해당 id에 맞는 todo 찾기
  const todo = todos.find(todo => todo.id === id);
  console.log(todos)
  // todo가 없는 경우 예외 처리
  if (!todo) {
    return <div>해당 할 일을 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <h2>할 일 상세 페이지</h2>
      <p>{todo.text}</p>
    </div>
  );
};

export default TodoDetail;
