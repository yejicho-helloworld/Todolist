// 다크모드 구현하기
// 어플리케이션에서 공통적으로, 전반적으로 필요한 setting이라면 context를
// 활용해볼 수 있음.

import { createContext, useContext, useState } from "react";

export const DarkModeContext = createContext();
// 우선은 이 context를 이용해서 자식 컴포넌트들에게 데이터를 전달해줄 수 있는
// 우산을 만들어야 함.

// 인자로는 자식 node들을 받아옴.
export function DarkModeProvider({ children }) {
  // 공통적인 데이터를 useState를 이용해서 정해봄.
  // 처음에는 데이터가 false로 되어있어서 lightmode로 시작할 수 있게 해줌.
  const [darkMode, setDarkMode] = useState(false);
  // 우선 setDarkMode를 바로 자식으로 전달해줘도 되지만 자식 노드에서 이전 다크모드가
  // 아니라면 반대의 boolean을 설정하는 것조차 내부 구현사항이기 때문에 이렇게 자세하게
  // 설정하는 것은 toggleDarkMode에서 해줌.
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };
  // 그래서 자식들을 그냥 toggle만 누르면 이전 상태를 반대로 설정해줄 수 있도록
  // 쉽게 쓸 수 있도록 만들어봄. 그래서 setDarkMode를 darkMode와 반대로 해줌.
  // prev를 받아서 prev의 반대값을 설정할 수 있도록 만들어볼 수도 있음.
  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
  // 객체를 만들어서 darkMode와 toggle할 수 있는 것까지 설정해둘거야. 그러면
  // children 중에, 자식들 중에 필요한 사람들만 darkMode와 toggleDarkMode에
  // 접근하면 됨. 
}

// 이전에 context를 만들고 나서 사용하는 곳에서 useContext를 이용해서
// 어떤 context를 사용할건지 darkMdoeContext를 사용할거다, 라고 명시를
// 해주고 사용을 했음. 그런데 이것은 사용하는 곳에서 일일이 DarkModeContext라는
// 사실을 알고 있어야함. 
// => 이 부분 간소화시켜보고 싶음. 
export const useDarkMdoe = () => useContext(DarkModeContext);
// useDarkMode라고 하면 우리가 내부적으로 useContext를 이용해서 
// DarkModeContext를 사용할 수 있도록 만들어줌. 그럼 사용하는 곳에서 useDarkMode라고
// 하면 내부적으로 어떤 context를 쓰는지 상관하지 않아도, 신경쓰지 않아도 됨. 
