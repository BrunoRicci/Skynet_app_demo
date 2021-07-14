import { useState, useEffect } from 'react';
import { render } from 'react-dom';
import '../assets/css/toDoList.css'
import ToDoItem from './TodoItem';


function PendingItems({todo_list, setTodoList}){

    let itemsList = [];

    todo_list.map((item)=>{
        if(!item.isDone)
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
    //Iterate items and return only the "pending" ones
    return(
        itemsList
    );

}


export default PendingItems;