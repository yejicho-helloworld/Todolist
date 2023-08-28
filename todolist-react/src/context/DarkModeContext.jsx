// 다크모드 구현하기
// 어플리케이션에서 공통적으로, 전반적으로 필요한 setting이라면 context를
// 활용해볼 수 있음.

import { createContext, useContext, useEffect, useState } from "react";

export const DarkModeContext = createContext();
// 우선은 이 context를 이용해서 자식 컴포넌트들에게 데이터를 전달해줄 수 있는
// 우산을 만들어야 함.

// 인자로는 자식 node들을 받아옴.
export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    // setDarkMode((prev) => !prev);
    setDarkMode(!darkMode);
    updateDarkMode(!darkMode);
  };
  // page가 Load되었을 때 하려고 함 ->
  // provider context가 마운트되었을 때 설정을 해줄 수 있도록 함.

  // DarkMode인지 아닌지 boolean을 받아와서 만약 darkMode라면
  // 우리 브라우저 document에 있는 documentElement의 class의 dark라는 것을
  // class로 등록해줌. 반대로 다크모드가 아닌 경우에는 반대로 dark라는
  // class를 제거해줌.

  useEffect(() => {
    // localStorage theme이 dark로 되어있거나 theme이 저장되어있지 않고
    // window에 darkMode를 쓴다고 설정이 되어있다면 darkMode인지 아닌지
    // 변수에 먼저 저장해줌.
    const isDark =
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    // 다크모드인지 아닌지 먼저 state에 내부 상태에 업데이트해줌. 
    // provider, 우산 안에서 쓰이는 데이터를 담고 있는 리액트 내부 
    // state에 먼저 업데이트를 해줌. 그 다음에 우리 웹페이지에 있는 html에
    // dark라는 클래스를 넣을건지 안넣을 건지를 판단하는 함수도 부가적으로 호출해줌. 
    setDarkMode(isDark);
    updateDarkMode(isDark);
  }, []);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
  // 객체를 만들어서 darkMode와 toggle할 수 있는 것까지 설정해둘거야. 그러면
  // children 중에, 자식들 중에 필요한 사람들만 darkMode와 toggleDarkMode에
  // 접근하면 됨.
}

// DarkMode인지 아닌지 boolean을 받아와서 만약 darkMode라면 우리
// 브라우저 document에 있는 documentElement의 class의 dark라는 것을
// class를 등록해줌. 그리고 다크모드가 아닌 경우에는 반대로 dark라는 class를 제거해줌.

function updateDarkMode(darkMode) {
  if (darkMode) {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
    // toggling이 될 때마다, 업데이트가 될 때마다 우리 localStorage에도
    // 저장을 해주도록 함. 
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
  }
}
// 개발자 도구를 통해 확인해보면 darkMode를 toggling하면 html class의
// 태그가 dark가 되었다가 없어졌다가를 반복함.
// -> 그래서 이 부분을 나중에 css selector를 이용해서 꾸며주면 됨!

// 이전에 context를 만들고 나서 사용하는 곳에서 useContext를 이용해서
// 어떤 context를 사용할건지 darkMdoeContext를 사용할거다, 라고 명시를
// 해주고 사용을 했음. 그런데 이것은 사용하는 곳에서 일일이 DarkModeContext라는
// 사실을 알고 있어야함.
// => 이 부분 간소화시켜보고 싶음.
export const useDarkMode = () => useContext(DarkModeContext);
// useDarkMode라고 하면 우리가 내부적으로 useContext를 이용해서
// DarkModeContext를 사용할 수 있도록 만들어줌. 그럼 사용하는 곳에서 useDarkMode라고
// 하면 내부적으로 어떤 context를 쓰는지 상관하지 않아도, 신경쓰지 않아도 됨.

