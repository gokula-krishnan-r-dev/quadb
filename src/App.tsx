import { Provider } from "react-redux";
import store from "./redux/store";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Authentication from "./components/Authentication";

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100 p-4">
        <Authentication />
        <div className="max-w-xl mx-auto bg-white p-4  rounded-3xl shadow-md">
          <h1 className="text-2xl font-bold mb-4">
            Advanced To-Do Application
          </h1>
          <TaskInput />
          <TaskList />
        </div>
      </div>
    </Provider>
  );
}

export default App;
