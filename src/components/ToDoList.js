import { FileCoverage } from "istanbul-lib-coverage";
import DoneItems from "./DoneItems";
import PendingItems from "./PendingItems";
import ToDoItem from "./TodoItem";


function ToDoList({todo_list, setTodoList}){
    console.log('todolist:', todo_list);
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