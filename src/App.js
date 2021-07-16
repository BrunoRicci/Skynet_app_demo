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

/************************************************/
/*        Step 4.2 Code goes here               */
/************************************************/
import { ContentRecordDAC } from '@skynetlabs/content-record-library';


/*****/

/************************************************/
/*        Step 1.2 Code goes here               */
/************************************************/
// Import the SkynetClient and a helper
import { SkynetClient } from 'skynet-js';

// We'll define a portal to allow for developing on localhost.
// When hosted on a skynet portal, SkynetClient doesn't need any arguments.
const portal = window.location.hostname === 'localhost' ? 'https://siasky.net' : undefined;

// Initiate the SkynetClient
const client = new SkynetClient(portal);
// const client = new SkynetClient();


/*****/

/************************************************/
/*        Step 4.3 Code goes here               */
/************************************************/
const contentRecord = new ContentRecordDAC();
console.log(contentRecord);

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

  // When dataKey changes, update FilePath state.
  useEffect(() => {
    setFilePath(dataDomain + '/' + dataKey);
  }, [dataKey]);

  /************************************************/
  /*        Step 3.1 Code goes here               */
  /************************************************/

  // choose a data domain for saving files in MySky
  const dataDomain = '';
  // const dataDomain = 'localhost';

  /*****/

  // On initial run, start initialization of MySky
  useEffect(() => {
    /************************************************/
    /*        Step 3.2 Code goes here               */
    /************************************************/
    // define async setup function
    async function initMySky() {
      try {
        
        // load invisible iframe and define app's data domain
        // needed for permissions write
        const mySky = await client.loadMySky(dataDomain);

        // load necessary DACs and permissions
        await mySky.loadDacs(contentRecord);                //Uncommented -> a

        // check if user is already logged in with permissions
        const loggedIn = await mySky.checkLogin();

        // set react state for login status and
        // to access mySky in rest of app
        setMySky(mySky);
        // setDataKey('todoListApp');
        console.log('intial filepath: ',filePath);

        setLoggedIn(loggedIn);
        if (loggedIn) {
          setUserID(await mySky.userID());
          console.log('logged in:', loggedIn, await mySky.userID());
          
          //Loads data previously saved.
          // loadData(mySky);
          getData();

        }
      } catch (e) {
        console.error(e);
      }
    }

    // call async setup function
    initMySky();


    /*****/
  }, []);

  const initData = ()=>{

  }

  // Handle form submission. This is where the bulk of the workshop logic is
  // handled
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('form submitted');
    setLoading(true);

    /************************************************/
    /*        Part 1: Upload a file                */
    /************************************************/
    console.log('Uploading file...');

    /************************************************/
    /*        Step 1.3 Code goes here               */
    /************************************************/
    // Upload user's file and get backs descriptor for our Skyfile
    const { skylink } = await client.uploadFile(file);

    // skylinks start with `sia://` and don't specify a portal URL
    // we can generate URLs for our current portal though.
    const skylinkUrl = await client.getSkylinkUrl(skylink);

    console.log('File Uploaded:', skylinkUrl);

    // To use this later in our React app, save the URL to the state.
    setFileSkylink(skylinkUrl);


    /************************************************/
    /*        Part 2: Upload a Web Page             */
    /************************************************/
    console.log('Uploading web page...');

    /************************************************/
    /*        Step 2.1 Code goes here               */
    /************************************************/
    // Create the text of an html file what will be uploaded to Skynet
    // We'll use the skylink from Part 1 in the file to load our Skynet-hosted image.
    
    // const webPage = generateWebPage(name, skylinkUrl);
    const webPage = generateWebPage(name, skylinkUrl, userID, filePath);
    // Build our directory object, we're just including the file for our webpage.
    const webDirectory = {
      'index.html': webPage,
      // 'couldList.jpg': moreFiles,
    };

    // Upload user's webpage
    const { skylink: dirSkylink } = await client.uploadDirectory(
      webDirectory,
      'certificate'
    );

    // Generate a URL for our current portal
    // We'll use a subdomain-style link
    const dirSkylinkUrl = await client.getSkylinkUrl(dirSkylink, {
      subdomain: true,
    });

    console.log('Web Page Uploaded:', dirSkylinkUrl);

    // To use this later in our React app, save the URL to the state.
    //setWebPageSkylink(dirSkylink);
    //setWebPageSkylinkUrl(dirSkylinkUrl);


    /************************************************/
    /*        Part 3: MySky                         */
    /************************************************/
    console.log('Saving user data to MySky file...');

    /************************************************/
    /*        Step 3.6 Code goes here              */
    /************************************************/
    // create JSON data to write to MySky
    const jsonData = {
      name,
      skylinkUrl,
      dirSkylink,
      dirSkylinkUrl,
      color: userColor,
    };

    // call helper function for MySky Write
    await handleMySkyWrite(jsonData);


    /*****/

    setLoading(false);
  };

  const handleMySkyLogin = async () => {
    /************************************************/
    /*        Step 3.3 Code goes here               */
    /************************************************/
    // Try login again, opening pop-up. Returns true if successful
    const status = await mySky.requestLoginAccess();

    // set react state
    setLoggedIn(status);

    if (status) {
      setUserID(await mySky.userID());
    } 
    /*****/
  };

  const handleMySkyLogout = async () => {
    /************************************************/
    /*        Step 3.4 Code goes here              */
    /************************************************/
    // call logout to globally logout of mysky
    await mySky.logout();

    //set react state
    setLoggedIn(false);
    setUserID('');

    console.log('logged out');
    /*****/
  };

  const handleMySkyWrite = async (jsonData) => {
    /************************************************/
    /*        Step 3.7 Code goes here              */
    /************************************************/
    // Use setJSON to save the user's information to MySky file

  
    //Convert todo_list array to JSON
    console.log(todo_list);

    try {
      console.log('userID', userID);
      console.log('filePath', filePath);
      await mySky.setJSON(filePath, jsonData);
    } catch (error) {
      console.log(`error with setJSON: ${error.message}`);
    }


    /*****/
    /************************************************/
    /*        Step 4.7 Code goes here              */
    /************************************************/
    try {
      await contentRecord.recordNewContent({
        skylink: jsonData.dirSkylink,
      });
    } catch (error) {
      console.log(`error with CR DAC: ${error.message}`);
    }
    

    /*****/
  };

  // loadData will load the users data from SkyDB
  const loadData = async (x) => {
    // event.preventDefault();
    setLoading(true);
    console.log('Loading user data from SkyDB', x);

    /************************************************/
    /*        Step 4.5 Code goes here              */
    /************************************************/
    // Use getJSON to load the user's information from SkyDB
    // const { data } = await mySky.getJSON(filePath);
    console.log('loadData filepath: ', filePath);
    const {data}  = await x.getJSON(filePath);

    //Get data and save it to todo_list
    if (data) {
      let temp_data = []  //-> convert data from JSON to array
      setTodoList(data)
      console.log('User data loaded from SkyDB!');
    } else {
      console.error('There was a problem with getJSON');
    }

    console.log('read data:', data);

    /*****/

    setLoading(false);
  };

  const getData = async ()=>{
    try {
      // Get discoverable JSON data from the given path.
      const { data, dataLink } = await mySky.getJSON("app.hns/path/file.json");
    } catch (error) {
      console.log(error)
    }
  }

  const handleSaveAndRecord = async (event) => {
    event.preventDefault();
    setLoading(true);

    /************************************************/
    /*        Step 4.6 Code goes here              */
    /************************************************/
    console.log('Saving user data to MySky');

    const jsonData = {
      name,
      skylinkUrl: fileSkylink,
      dirSkylink: webPageSkylink,
      dirSkylinkUrl: webPageSkylinkUrl,
      color: userColor,
    };
    
    try {
      // write data with MySky
      await mySky.setJSON(filePath, jsonData);
    
      // Tell contentRecord we updated the color
      await contentRecord.recordInteraction({
        skylink: webPageSkylink,
        metadata: { action: 'updatedColorOf' },
      });
    } catch (error) {
      console.log(`error with setJSON: ${error.message}`);
    }
    
    /*****/

    setLoading(false);
  };

  // define args passed to form
  const formProps = {
    mySky,
    handleSubmit,
    handleMySkyLogin,
    handleMySkyLogout,
    handleSaveAndRecord,
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
      

      <div
        className="list-body"
      >
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
          />
        </div>

      </div>
    </Container>

  </div>    

  );
}

export default App;
