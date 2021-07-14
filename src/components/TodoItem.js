// import { List } from "semantic-ui-react";
import ToDoList from "./ToDoList";
import '../assets/css/toDoList.css';
import { map } from "jquery";

const ToDoItem = ({description, id, isDone, todo_list, setTodoList})=>{
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
        
        item_text_label.className='description hidden';
        item_text_input.className='description visible';
        
        item_btn_edit.className='button-edit hidden';
        item_btn_rdy.className='button-ready visible';

    }

    const onInputChange = (e)=>{
        description = document.querySelector(`#item_edit_${id}`).value; //Update value in item edit field
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
                i.description=description;
                console.log('saved:',i.description, i.id);
            }
        })
        // setTodoList([...todo_list,{id: id, description:description, isDone:false}]);

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

    const setCompletedItem = ()=>{

    };

    let classname = 'list-item';
    if(isDone){
        classname = 'list-item done'
    }
    
    let item =  <div className={classname} key={id} >
                    <input type="checkbox" className="item-checkbox" id={`chkbx_${id}`} ></input>

                    <p className="description visible" id={`item_label_${id}`}>{description}</p>
                    <input type="text" className="description hidden" value={description} id={`item_edit_${id}`} onChange={onInputChange} ></input>

                    <button type="button" id={`btn_edit_${id}`} className="button-edit" onClick={editItem}>E</button>
                    <button type="button" id={`btn_rdy_${id}`} className="button-ready hidden" onClick={saveItem}>R</button>
                    <button type="button" id={`btn_del_${id}`} className="button-delete" onClick={deleteItem}>X</button>
                </div>;


    return(item);
};


export default ToDoItem;