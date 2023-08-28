import React, { useEffect, useState } from "react";
import AddTodo from "../AddTodo/AddTodo";
import Todo from "../Todo/Todo";
import styles from "./TodoList.module.css";

// 새롭게 추가하고 새로고침만 해도 사라지고, 장보기와 공부하기는 내가 입력한 것이
// 아니라 하드코드된 글자임. 그래서 이 목록들을 지우고 우리가 새로운 todo를
// 입력했을 때 저장을 해주고 다시 page를 refresh해도 예전 todo item을
// 기억할 수 있도록 localStorage를 만들어봄.
// 어디에다가 언제 새로운 todo를 저장하면 좋을지, 언제 저장된 todofmf
// 읽어와야할지 고민하면서 구현.

// todo가 변경이 될 때마다, 업데이트될 때마다 localStorage에 저장을 해줌.
// 그래서 특정한 값이 변경될 때마다 무언가를 하고 싶다면, 리액트에서 원래
// 발생하는 state가 변경이 되어서 ui를 업데이트하는 흐름이 아니라 우리가 side effect으로,
// 부가적으로 state가 변경이 되어서 ui가 업데이트될 때마다 추가적으로 해줘야하는게
// 있다면, 또는 컴포넌트가 마운트될 때 처으믕로 해줘야하는게 있다면, 또는 마운트가
// 끝날 때, 화면에서 사라질 때 정리해줘야하는 것이 있다면 바로 useEffect임.
// 그래서 useEffect를 이용해서 todo가 변경이 될 때마다 그걸 storage에 저장함.

// 상위 컴포넌트에서 prop으로 전달받는게 아니라, 하위 컴포넌트로 넘겨주는 것!
export default function TodoList({ filter }) {
  // localStorage에 있는 getItem을 이용해서 todo에 있는 값을 가지고옴.
  // 그리고 이것도 JSON으로 변환해야하는데, 코드가 길어지므로 별도의 함수를
  // 이용함. 그리고 컴포넌트 밖에서 함수를 따로 정의해줌.
  const [todos, setTodos] = useState(() => readTodosFromLocalStorage());
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
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  // 내가 무언가를 수행하고 싶은데 todo가 변경이 될 때마다 localStorage의
  // setItems를 이용해서 todos라는 key에 object를 저장할건데 객체를
  // 배열에 저장하기 위해서는 JSON으로 변환해주어야함. 그래서 JSON에 있는
  // stringify를 이용해서 todos를 JSON으로 변환해준 다음에 JSON을
  // todos라는 key에 저장함.
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

// localStorage에서 todos를 읽어온 다음에 localStorage에 todos가 있다면
// JSON으로 parse를 해줌.
function readTodosFromLocalStorage() {
  console.log("readTodosFromLocalStorage");
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}
// 그래서 이 함수를 호출하면 storage에서 todos를 읽어와서 todos가 있다면
// JSON으로 다시 parse해서 배열로 만들어주고, 저장된 todos가 없다면
// 빈 배열을 return 하도록 만듦.

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
