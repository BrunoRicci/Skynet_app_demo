import ToDoItem from "./TodoItem";


function ToDoList(){

    // let itemsList = [];

    // for (let i = 0; i < 3; i++) {
    //     itemsList.push(ToDoItem('sadsa'));
    // }

    let itemsList = [
        ToDoItem('Item 1'),
        ToDoItem('Item 2'),
        ToDoItem('Item 3'),

    ];

    console.log(itemsList);

    return(
        itemsList
    );
}

export default ToDoList;