// import { List } from "semantic-ui-react";
import ToDoList from "./ToDoList";
import '../assets/css/toDoList.css';

const ToDoItem = (description, isDone)=>{
    /*  Item of the list: Consists on:
        - Task text label / text box
        - Edit button
        - Delete button
        - Checkbox (to indicate it's done)
    
    */
    function editItem(){
        let text = document.querySelectorAll(".description");
        console.log(text, description);

         //select textbox
    }
    
    // description = "item";
    let classname = 'list-item';
    if(isDone){
        classname = 'list-item done'
    }

    let item =  <div class={classname}>
                    <input type="checkbox" class="item-checkbox"></input>

                    <p class="description visible">{description}</p>
                    <input class="description hidden"></input>

                    <button type="button" class="button-edit" onclick="editItem()">E</button>
                    <button type="button" class="button-delete" pn click="deleteItem()">X</button>
                </div>;
    
    


    return(item);
};


export default ToDoItem;