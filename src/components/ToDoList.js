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
            />
            <DoneItems
            todo_list={todo_list}
            />
            {/* {
                todo_list.map( (item)=>{
                    
                    <ToDoItem
                        description={item.description}
                        id={item.id}
                        isdone={false}
                    />
                }
                )
            } */}
        </div>
    );
}

export default ToDoList;