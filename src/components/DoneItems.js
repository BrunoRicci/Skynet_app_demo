import { useState, useEffect } from 'react';
import '../assets/css/toDoList.css'
import ToDoItem from './TodoItem';


function DoneItems({todo_list, setTodoList}){
    
    let itemsList = [];

    todo_list.map((item)=>{
        if(item.isDone)
            itemsList.push(
                ToDoItem({  description:item.description,
                            id:item.id, 
                            isDone:item.isDone,
                            todo_list:todo_list,
                            setTodoList:setTodoList
                        })
            )
    }
    );
    //Iterate items and return only the "done" ones
    return(
        itemsList
    );

}


export default DoneItems;