import { useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList/TodoList";
import Header from "./components/Header/Header";
import { DarkModeProvider } from "./context/DarkModeContext";

// header에 어떤 filter들이 있는지, 지금 현재 선택된 filter가 뭔지,
// filter가 변경이 되면 어플리케이션에서 알려주면 어플리케이션에서 todolist한테
// 야, 이 필터좀 적용해 라고 알려주면 <Todolist>에서 자체적으로 해당하는
// 아이템들을 보여줄 수 있도록 만들면 됨. 그래서 <header />와 어떤
// <Todolist />가 어떤 filter가 선정이 되었는지 공통적으로 알야야함!
const filters = ["all", "active", "completed"];
function App() {
  const [filter, setFilter] = useState(filters[0]);
  return (
    <DarkModeProvider>
      {/* header한테 우리가 사용하고 있는 모든 filter에 대한 정보와 현재 선택된
    filter의 정보, filter가 변경이 되면 호출할 수 있는 setFilter를 전닳해주고, 
    TodoList한테도 filter에 대한 정보를 줌.  */}
      <Header filters={filters} filter={filter} onFilterChange={setFilter} />
      <TodoList filter={filter} />
    </DarkModeProvider>
  );
}

// 우산을 씌워준 다음에 우산 안에 있는 자식 노드들에서 useDarkMode를 사용가능.
// 이렇게 해준 다음에 icon을 만들어야함. 
export default App;
