// import { List } from "semantic-ui-react";
import ToDoList from "./ToDoList";
import '../assets/css/toDoList.css';
import { map } from "jquery";
import { render } from "react-dom";
import { Button } from "semantic-ui-react";

const ToDoItem = ({description, id, isDone, todo_list, setTodoList})=>{
    /*  Item of the list: Consists on:
        - Task text label / text box
        - Edit button
        - Delete button
        - Checkbox (to indicate it's done)
    
    */
    const forceUpdate = ()=>{
        setTodoList([...todo_list]);
    }

    const editItem = ()=>{
        
        let item_text_label = document.querySelector(`#item_label_${id}`);
        let item_text_input = document.querySelector(`#item_edit_${id}`);
        let item_btn_edit = document.querySelector(`#btn_edit_${id}`);
        let item_btn_rdy = document.querySelector(`#btn_rdy_${id}`);
        
            // description = item_text_input; //Update value in item edit field
            document.querySelector(`#item_edit_${id}`).value=description;

        item_text_label.className='description hidden';
        item_text_input.className='description visible';
        
        item_btn_edit.className='button-edit hidden';
        item_btn_rdy.className='button-ready visible';

    }

    const onInputChange = (e)=>{
        // description = document.querySelector(`#item_edit_${id}`).value; //Update value in item edit field
        console.log(description);
    };

    const saveItem = (e)=>{
        let item_text_label = document.querySelector(`#item_label_${id}`);
        let item_text_input = document.querySelector(`#item_edit_${id}`);
        let item_btn_edit = document.querySelector(`#btn_edit_${id}`);
        let item_btn_rdy = document.querySelector(`#btn_rdy_${id}`);

        
        item_text_label.className='description visible';
        item_text_input.className='description hidden';
        
        item_btn_edit.className='button-edit visible';
        item_btn_rdy.className='button-ready hidden';

        // setTodoList( (prev)=>([...prev,{id: id, description:e.target.value, isDone:false}]) );
        // deleteItem();
        // console.log(todo_list);
        todo_list.map((i)=>{
            if(i.id==id){
                i.description=item_text_input.value;
            }
        })
        forceUpdate();    //Force update of the component (bad practice btw...)
        console.log('item '+id+' saved.');
    };

    const deleteItem = ()=>{
        //filter -> to delete items from array
        setTodoList(todo_list.filter( (item)=>{
            //Return all the elements but the current one (delete it)
            return(item.id !== id);     
        }
        ));
        console.log('item '+id+' deleted.');
    };

    const toggleCompletedItem = ()=>{
        todo_list.map((i)=>{
            if(i.id==id){
                i.isDone=!i.isDone;
            }
        })        
        //TROUBLE IS HERE! see how to properly update the todo_list content using useState.
        forceUpdate();    //Force update of the component (bad practice btw...)
        
        
        console.log('toggle', id, todo_list); 
    };

    let class_item_state = 'list-item';
    if(isDone){
        class_item_state = 'list-item done'
    }
    
    let item = 
        <div className={class_item_state} key={id} >
            <input 
                type="checkbox"
                checked={isDone}
                className="item-checkbox" 
                id={`chkbx_${id}`} 
                onChange={toggleCompletedItem} 
            />

            <p className="description visible" id={`item_label_${id}`}>{description}</p>
            <input 
                type="text" 
                className="description hidden" 
                // value={description} 
                id={`item_edit_${id}`} 
                onChange={onInputChange}
            ></input>

            <button type="button" id={`btn_edit_${id}`} className="trash icon" onClick={editItem}>E</button>
            <button type="button" id={`btn_rdy_${id}`} className="button-ready hidden" onClick={saveItem}>R</button>
            {/* <button type="button" id={`btn_del_${id}`} className="button-delete" onClick={deleteItem}>X</button> */}
            
            <div 
                className="button-delete"
                id={`btn_del_${id}`} 
                onClick={deleteItem}
            >
                <i class="trash icon" style={{fontSize:'13px',position:'relative' ,margin:'10% auto'}}></i>
            </div>
            {/* <button type="button" id={`btn_done_${id}`} className="button-done" onClick={toggleCompletedItem}>-</button> */}
        </div>;

    return(item);
};


export default ToDoItem;