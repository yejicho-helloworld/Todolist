import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import styles from './Todo.module.css';

// 체크박스, 라벨, 그리고 삭제를 할 수 있는 버튼이 있어야함.
export default function Todo({ todo, onUpdate, onDelete }) {
  // const의 text와 status라는 변수를 todo의 object로부터 받아옴.
  const { id, text, status } = todo;
  //   handleChange는 checkbox의 상태가 변경이 되면 호출되는 함수임!
  //   const handleChange = (todos) => onUpdate(todos);
  const handleChange = (e) => {
    const status = e.target.checked ? "completed" : "active";
    // togglin을 하면 active가 되거나 completed가 되거나 둘 중 하나임.
    onUpdate({ ...todo, status: status });
    // 코드가 변경이 되면 onUpdate를 호출해주면서 변경된 todo의 상태는 일일이
    // 낱개로 풀어서 todo의 id..status...를 그대로 쓰면서 status만 우리가
    // 원하는 것으로 업데이트해줌.

    // onUpdate는 기존의 todo 그대로 두고 status만 바꿔줌.
  };
  const handleDelete = () => onDelete(todo);
  return (
    <li className={styles.todo}>
      <input
      className={styles.checkbox}
        type="checkbox"
        id={id}
        onChange={handleChange}
        checked={status === "completed"}
      />
      <label htmlFor={id} className={styles.text}>{text}</label>
      <span className={styles.icon}>
        <button onClick={handleDelete} className={styles.button}>
          <FaTrashAlt />
        </button>
      </span>
    </li>
  );
}
