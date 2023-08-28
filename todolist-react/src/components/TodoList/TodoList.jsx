import React, { useState } from "react";
import AddTodo from "../AddTodo/AddTodo";
import Todo from "../Todo/Todo";
import styles from "./TodoList.module.css";

// 상위 컴포넌트에서 prop으로 전달받는게 아니라, 하위 컴포넌트로 넘겨주는 것!
export default function TodoList({ filter }) {
  const [todos, setTodos] = useState([
    { id: "123", text: "장보기", status: "active" },
    { id: "124", text: "밥먹기", status: "active" },
  ]);
  const handleAdd = (todo) => setTodos([...todos, todo]);
  // handleUpdate는 update하고자하는 것들만 update하는 걸로 바꿔주고 기존의 아이템
  // 그대로 유지하면서 새로운 배열을 만들었음.
  const handleUpdate = (updated) =>
    setTodos(todos.map((todo) => (todo.id === updated.id ? updated : todo)));
  // handleDelete는 setTodos를 할 때 배열을 빙글빙글 돌면서 id가 삭제하고자하는
  // id가 아닌 것들만 모아서 setTodos를 해주었음.
  const handleDelete = (deleted) =>
    setTodos(todos.filter((todo) => todo.id !== deleted.id));
  // todo!!!!를 받아와야함. 객체를 '''배열'''안에 담아줘야함.
  const filtered = getFilteredItems(todos, filter);
  // 그래서 filtered에는 우리가 선택한 filter에 해당하는 투두만 들어잇음.
  // 그래서 투두 대신에 filter된 것들만 map할 수 있도록 만들면 됨.
  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {/* li 대신에 todo라는 컴포넌트를 씀. 그리고 Text를 
children으로 보내주는 todo에 item 자체를 전달하고, 아이템이 update되었을 때
호출해야하는 callback 함수도 전달해줌 prop으로! */}
        {filtered.map((item) => (
          <Todo
            key={item.id}
            todo={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      {/* handleAdd는 setTodos를 빙글빙글 배열을 풀어서 새로 업데이트되는 것만 뒤에서 넣어줌.
       */}
      {/* todo를 추가하는 부분은 따로 있기 때문에 따로 만들어놓는다.  */}
      {/* 하위 컴포넌트로 부터 prop으로 전달받는다 */}
      <AddTodo onAdd={handleAdd} />
    </section>
  );
}

function getFilteredItems(todos, filter) {
  if (filter === "all") {
    return todos;
  } else {
    return todos.filter((todo) => todo.status === filter);
  }
}
// function getFilteredItems는 현재 todos배열과 어떤 것을 filter해야
// 하는지 데이터를 받아옴. 만약 filter가 all이라면, 전부 다 보여주는 것이라면
// 우리가 별도로 filter할 필요가 없기 때문에 todos를 다 return하고,
// 만약 filter가 all이 아닌 경우에는 todos의 filter를 이용해서 각각
// todo를 받아와서 todo의 status가 filter에 해당하는 것만 filtering해줌.

// todolsit에서 filter를 prop으로 받아, 선택된 filter를 통해서 해당하는
// 요소만 보여줌. 그러면 밑에서 전체의 todo를 보여주는 것이 아니라, 우리가 const에
// Filtered된 item을 받아와서 filtered를 받아오도록 만듦.
//
