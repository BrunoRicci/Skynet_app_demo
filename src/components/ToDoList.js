import { FileCoverage } from "istanbul-lib-coverage";
import DoneItems from "./DoneItems";
import PendingItems from "./PendingItems";
import ToDoItem from "./TodoItem";


function ToDoList({todo_list, setTodoList, data_load, loading, setLoading}){
    // console.log('todolist:', todo_list);
    
    // data_load();
    
    return(
        <div>
            <PendingItems
            todo_list={todo_list}
            setTodoList={setTodoList}
            />
            <DoneItems
            todo_list={todo_list}
            setTodoList={setTodoList}
            />
        </div>
    );
}

export default ToDoList;