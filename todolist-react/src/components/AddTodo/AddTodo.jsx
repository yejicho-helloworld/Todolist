import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

// prop은 객체이기 때문에 {}를 붙여준다.
export default function AddTodo({ onAdd }) {
  const [text, setText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length === 0) {
      return;
    }
    onAdd({ id: uuidv4(), text, status: "active" });
    setText("");
  };
  // addTodo 컴포넌트에서 입력한 값을 받아 onAdd를 통해서 Todolist에 전달해주는 것이기
  // 때문에 onadd를 통해 todo 객체 값 전달해주기.
  const handleChange = (e) => setText(e.target.value);
  return (
    <form onSubmit={handleSubmit}>
      {/* input을 입력할 때 변화되는 부분에 대해서 onchange로 받아옴. 
        input에는 value가 필요함. */}
      <input
        type="text"
        placeholder="Add Todo"
        value={text}
        onChange={handleChange}
      />
      <button>Add</button>
    </form>
  );
}
