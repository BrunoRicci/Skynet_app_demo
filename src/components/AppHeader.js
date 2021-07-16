import { useState, useEffect } from 'react';
import { Header } from 'semantic-ui-react';
import '../assets/css/toDoList.css'


function AppHeader(){
    
    return(
        <Header
          className="h1"
          content="Todo list Skapp"
          textAlign="center"
          style={{ marginTop: '2em', marginBottom: '1em'}}
        />
    );

}


export default AppHeader;