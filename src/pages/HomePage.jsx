import TodoList from "../components/TodoList";

function HomePage() {
  return (
    <div className="flex-1 py-20 grid grid-cols-[1fr_3fr_1fr] border-t-1 border-[#DFA837] border-b-1">
      <div></div>
      <div>
        <TodoList />
      </div>
      <div></div>
    </div>
  );
}

export default HomePage;
