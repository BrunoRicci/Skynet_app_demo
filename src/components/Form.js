import { useState, useEffect } from 'react';
import '../assets/css/toDoList.css'
import {v4 as uuidv4} from "uuid";  //items id handling

function Form({input_item, setInputItem, todo_list, setTodoList}){
  /*Item input section*/

  
  const onInputChange = (e)=>{
    setInputItem(e.target.value); //Update value in input_item
  };

  const onFormSubmit = (e)=>{
    e.preventDefault();
    setInputItem(e.target.value); //Update value in input_item

    //Append new item to todo_list
    setTodoList([...todo_list,{id: uuidv4(), description:input_item, isDone:false}]);
    
    setInputItem(""); //reset field
  };

  return(
  <form
    class="enter-item-box"
    onSubmit={onFormSubmit}
  >
    <input 
      type="text" 
      placeholder="Enter a task..."  
      className="task-input"
      required
      value={input_item}
      onChange={onInputChange}
    />
    <button class="task-input-button" type="submit">
      <i className="icon add"></i>
    </button>
  </form>
  );
}


export default Form;