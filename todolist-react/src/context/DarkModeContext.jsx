// 다크모드 구현하기
// 어플리케이션에서 공통적으로, 전반적으로 필요한 setting이라면 context를
// 활용해볼 수 있음. 

import { createContext } from "react";

export const DarkModeContext = createContext();
// 우선은 이 context를 이용해서 자식 컴포넌트들에게 데이터를 전달해줄 수 있는
// 우산을 만들어야 함. 
