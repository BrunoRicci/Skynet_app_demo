// import { List } from "semantic-ui-react";
import ToDoList from "./ToDoList";
import '../assets/css/toDoList.css';

const ToDoItem = ({description, id, isDone})=>{
    /*  Item of the list: Consists on:
        - Task text label / text box
        - Edit button
        - Delete button
        - Checkbox (to indicate it's done)
    
    */
   
    const editItem = ()=>{
        
        let item_text_label = document.querySelector(`#item_label_${id}`);
        let item_text_input = document.querySelector(`#item_edit_${id}`);
        let item_btn_edit = document.querySelector(`#btn_edit_${id}`);
        let item_btn_rdy = document.querySelector(`#btn_rdy_${id}`);

        console.log('click', id, item_text_label, description);
        
        //Hide label, show input box, hide edit button, show "ready" button
        item_text_label.className='description hidden';
        item_text_input.className='description visible';


    }

    const deleteItem = ()=>{

    };


    // description = "item";
    let classname = 'list-item';
    if(isDone){
        classname = 'list-item done'
    }
    
    let item =  <div className={classname} key={id} >
                    <input type="checkbox" class="item-checkbox" id={`chkbx_${id}`} ></input>

                    <p className="description visible" id={`item_label_${id}`}>{description}</p>
                    <input className="description hidden" value={description} id={`item_edit_${id}`}></input>

                    <button type="button" id={`btn_edit_${id}`} className="button-edit" onClick={editItem}>E</button>
                    <button type="button" id={`btn_rdy_${id}`} className="button-ready hidden" onClick={editItem}>R</button>
                    <button type="button" id={`btn_del_${id}`} className="button-delete" onClick={deleteItem}>X</button>
                </div>;
    
    
    let text = document.querySelectorAll(".description");
    


    return(item);
};


export default ToDoItem;