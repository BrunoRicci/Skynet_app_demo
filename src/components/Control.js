import { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import '../assets/css/toDoList.css'


function Control(params){
    
    return(
        <div>
            
            {params.loggedIn === true && (
                <div>
                     <Button 
                        primary 
                        className="logout-button red"
                        
                        id="logout_button"
                        onClick={params.handleMySkyLogout}
                    >
                        Log out
                    </Button>

                    <Button 
                        primary
                        color="green"
                        className="save-button"
                        id="save_button"
                        onClick={params.handleMySkyWrite}
                    >
                        Save
                    </Button>
                </div>
            )}

            {params.loggedIn === false && (
                
                <div>
                    <Button 
                        primary 
                        className="login-button "
                        id="login_button"
                        onClick={params.handleMySkyLogin}
                    >
                        Log in
                    </Button>
                </div>

                
                
            )}
            
        <div>

        </div>
        </div>
       
    );

}


export default Control;