// Import react components
import { useState, useEffect } from 'react';
import Control from './components/Control';
import AppHeader from './components/AppHeader';
import Form from './components/Form';
import ToDoList from './components/ToDoList';
import ToDoItem from './components/TodoItem';
import PendingItems from './components/PendingItems';
import DoneItems from './components/DoneItems';

// Import App Component & helper
import WorkshopForm from './components/Form';
import generateWebPage from './helpers/generateWebPage';

// Import UI Components
import { Header, Tab, Container } from 'semantic-ui-react';

import { ContentRecordDAC } from '@skynetlabs/content-record-library';


// Import the SkynetClient and a helper
import { SkynetClient } from 'skynet-js';

// When hosted on a skynet portal, SkynetClient doesn't need any arguments.
const portal = window.location.hostname === 'localhost' ? 'https://siasky.net' : undefined;

// Initiate the SkynetClient
const client = new SkynetClient(portal);
// const client = new SkynetClient();

/************************************************/
const contentRecord = new ContentRecordDAC();

/*****/

function App() {

  const [input_item, setInputItem] = useState('');
  const [todo_list, setTodoList] = useState([]);

  // Define app state helpers
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Step 1 Helpers
  const [file, setFile] = useState();
  const [fileSkylink, setFileSkylink] = useState('');

  // Step 2 Helpers
  const [name, setName] = useState('');
  const [webPageSkylink, setWebPageSkylink] = useState('');
  const [webPageSkylinkUrl, setWebPageSkylinkUrl] = useState('');

  // Step 3 Helpers
  const [dataKey, setDataKey] = useState('');
  const [userColor, setUserColor] = useState('#000000');
  const [filePath, setFilePath] = useState();
  const [userID, setUserID] = useState();
  const [mySky, setMySky] = useState();
  const [loggedIn, setLoggedIn] = useState(null);

  // choose a data domain for saving files in MySky
  const dataDomain = 'localhost';
  // When dataKey changes, update FilePath state.
  useEffect(() => {
    setFilePath(dataDomain + '/' + 'todoListSkapp');
  }, [dataKey]);
  
  
  // On initial run, start initialization of MySky
  useEffect(() => {

    // define async setup function
    async function initMySky() {
      try {
        
        // load invisible iframe and define app's data domain
        // needed for permissions write
        const mySky = await client.loadMySky(dataDomain);
        
        setDataKey('todoListSkapp');
        console.log('intial filepath: ',filePath);
        
        // load necessary DACs and permissions
        await mySky.loadDacs(contentRecord);                //Uncommented -> 

        // check if user is already logged in with permissions
        const loggedIn = await mySky.checkLogin();

        // to access mySky in rest of app
        setMySky(mySky);
        
        // set react state for login status and
        setLoggedIn(loggedIn);
        if (loggedIn) {

          setUserID(await mySky.userID());
          console.log('logged in:', loggedIn, 
          await mySky.userID(), 
          filePath);

          loadData(mySky, 'localhost/todoListSkapp');
        }
      } catch (e) {
        console.error(e);
      }
    }
    initMySky();

  
    
    
    /*
      It seems that mySky value is updated just before running this function. After that, everything runs fine.
      Try using a trigger or another async function to bring the data after a few seconds from when the
      loadMySky function has finished...

      Apparently, useState doesn't work fine from this useEffect function call...
      path and mySky are passed to the readData() function because they can't be read from there.
    */
   
   /*****/
  }, []); //Runs once at the beggining.
  


  const handleMySkyLogin = async () => {
   
    // Try login again, opening pop-up. Returns true if successful
    const status = await mySky.requestLoginAccess();

    setLoggedIn(status);

    if (status) {
      setUserID(await mySky.userID());
      console.log('logged in:', loggedIn, status);
      loadData(mySky, 'localhost/todoListSkapp');
    } 

  };

  const handleMySkyLogout = async () => {
   
    // call logout to globally logout of mysky
    await mySky.logout();

    setLoggedIn(false);
    setUserID('');

    console.log('logged out:', loggedIn);

  };

  const handleMySkyWrite = async () => {
    
    //Convert todo_list array to JSON
    let jsonData = {tasks:todo_list}
    
    console.log('Writing to MySky:', todo_list);

    try {
      console.log('userID', userID);
      console.log('filePath', filePath);
      await mySky.setJSON(filePath, jsonData);
      console.log('Data saved correctly.');
      // loadData();

    } catch (error) {
      console.log(`error with setJSON: ${error.message}`);
    }

  };

  const loadData = async (x, path) => {
    setLoading(true);
    console.log('Loading user data from skyDB');
   
    // Use getJSON to load the user's information from SkyDB
    console.log('mySky: ', x);

    const { data } = await x.getJSON(path);
    console.log('loadData filepath: ', path);

    //Get data and save it to todo_list
    if (data) {
      let temp_data = []  //-> convert data from JSON to array
      temp_data = data.tasks;
      setTodoList(temp_data)
      console.log('User data loaded from SkyDB!');
    } else {
      console.error('There was a problem with getJSON');
    }

    console.log('read data:', data);


    setLoading(false);
  };

  const getData = async ()=>{
    try {
      // Get discoverable JSON data from the given path.
      const { data, dataLink } = await mySky.getJSON("app.hns/path/file.json");
      console.log(data, dataLink);
    } catch (error) {
      console.log(error)
    }
  }


  // define args passed to form
  const formProps = {
    mySky,
    handleMySkyLogin,
    handleMySkyLogout,
    handleMySkyWrite,
    loadData,
    name,
    dataKey,
    userColor,
    activeTab,
    fileSkylink,
    webPageSkylinkUrl,
    loading,
    loggedIn,
    dataDomain,
    userID,
    setLoggedIn,
    setDataKey,
    setFile,
    setName,
    setUserColor,
  };




  return (

  <div>

    <Control
      {...formProps}
    />
    <Container>
      <AppHeader/>
        <div className="list-body"> 

          {(formProps.loggedIn === true) &&(
            <div>
              {(formProps.loading === true) &&(
                <div>
                  Loading...
                </div>
              )}

              {(formProps.loading === false)  &&(
                <div>
                  <Form
                    input_item={input_item}
                    setInputItem={setInputItem}
                    todo_list={todo_list}
                    setTodoList={setTodoList}
                  />
                  
                  <div>
                    <ToDoList
                      todo_list={todo_list}
                      setTodoList={setTodoList}
                      data_load={loadData}
                      loading={loading}
                      setLoading={setLoading}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {(formProps.loggedIn === false) &&(
              <div>
                Please log in with your SkyID.
              </div>
          )}

        </div>
    </Container>
  </div>    

  );
}

export default App;
