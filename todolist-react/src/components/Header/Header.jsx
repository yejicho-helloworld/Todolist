import React from "react";
import styles from "./Header.module.css";
import { useDarkMode } from "../../context/DarkModeContext";
import { HiMoon, HiSun } from "react-icons/hi";

export default function Header({ filters, filter, onFilterChange }) {
  const { darkMode, toggleDarkMode } = useDarkMode();
  // const에 우리가 필요한 darkMode인지 아닌지, 그리고 toggleDarkMode라는
  // 것을 useDarkMode 함수를 이용해서, hook을 이용해서 이렇게 값을 받아옴.
  // 그리고 useDarkMode, 즉 우산에 있는 데이터에 접근하려면 우산 안에 있어야함.
  // => 그래서 우산을 먼저 씌워줘야함. 우산은 App에 씌워줌.

  // 이렇게 다크모드인지 아닌지에 대한 data는 기억을 하는데, 그럼 darkMode일 때
  // 어떻게 우리가 UI를 변경할 것인가에 대해서 해봄.
  // darkMode가 설정이 되면, setDarkMode가 호출이 되면 UI element에, 
  // 즉 태그에 darkMode라는 클래스를 지정해줌. 그러면 우리가 css selector를
  // 이용해서 darkMode가 있을 때에는 다른 색상으로 표현되도록 만들 수 있음. 
  // 그래서 이 darkMode가 되면 setDarkMode도 해주고, updateDarkMode도 해줌. 
  // 그래서 updateDarkMode는 현재 가지고 있는 값에 반대로 toggling을
  // 해줘야함. 
  return (
    <header className={styles.header}>
      <button onClick={toggleDarkMode}>
        {!darkMode && <HiMoon />}
        {darkMode && <HiSun />}
      </button>
      <ul className={styles.filters}>
        {filters.map((value, index) => (
          <li key={index}>
            <button
              className={`${styles.filter} ${
                filter === value && styles.selected
              }`}
              onClick={() => onFilterChange(value)}
            >
              {/* button의 value와 현재 선택된 filter가 동일하다면 selected 라는 이름도 씀.
className을 조합하기 위해서는 섞어서 string을 써줌. 현재 선갠된 filter와
button의 값이 동일하다면 styles에 있는 selected도 써줌. 
button과 현재 선택된 fitler의 이름이 동일한 것만 selected가 되어서
ui에 나타냄. */}
              {value}
            </button>
          </li>
        ))}
      </ul>
    </header>
  );
}
// filters를 빙글빙글 돌면서 <li>를 이용해서 우리가 원하는 ui요소로 변환.
// 동적으로 list 요소가 변경되는 것이 아니라 고정된 ui이니까 index를 써도 괜찮음
// 그래서 filter의 value와 index를 빙글빙글 돌면서 li의 고유한 key는
// index로 지정해주고, li안에서도 button을 눌러야하니까 - active인지,
// completed인지 filter의 button을 누르니까 button의 태그를 이용해서 button의
// text는 value를 쓰도록 함. 그러면 각각 버튼이 나오고 onclick이 발생하면
// 우리가 원하는 것으로 filter를 설정해야하므로 onFilterChange를, 우리가 원하는,
// 즉 선택된 button의 value로 설정해줌. 그리고 나중에 이 button이 현재
// 설정된 filter라면 다른 ui와 다르게 활성화된 button을 만들어주면 어떤 게
// 현재 선택되어있는지 확인하기가 좋음.
