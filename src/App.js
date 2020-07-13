import React, { useState, useEffect } from "react";
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import "./App.css";
import Item from "./components/Item";
import AddItemForm from "./components/AddItemForm";
import axios from "axios";
import logo from './img/logo.png';


const App = () => {
  const [items, setItems] = useState([{ text: "...loading..." }]);
  const [newListId, setNewListId] = useState(0);
  
  // work around until react routes are implemented
  let listId = null;

  const queryString = window.location.search;
  if (queryString != "") {
    if (queryString.indexOf(":") !== -1) {
      listId = queryString.split(":")[1];
    }
  } else {
    listId = 1;
  }

  useEffect(() => {
    axios.get("https://shopping-assistant-json-server.herokuapp.com/lists/" + listId).then((response) => {
    //   console.log("promise fulfilled");
    //   console.log(response.data);
      setItems(response.data.newItems);
    });
  }, []);

  const addItem = (text, amount) => {
    const newItems = [...items, { text, amount, isCompleted: false }];

    console.log(newItems);
    console.log({ text, amount });

    axios.put("https://shopping-assistant-json-server.herokuapp.com/lists/" + listId, {
      newItems,
    });

    setItems(newItems);
  };

  const completeItem = (index) => {
    const newItems = [...items];
    newItems[index].isCompleted = !(newItems[index].isCompleted);

    axios.put("https://shopping-assistant-json-server.herokuapp.com/lists/" + listId, {
      newItems,
    });

    setItems(newItems);
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);

    axios.put("https://shopping-assistant-json-server.herokuapp.com/lists/" + listId, {
      newItems,
    });

    setItems(newItems);
  };
  
  

  const handleNewList = () => {
    let currentArrLengthOnServer = null;
    axios.get("https://shopping-assistant-json-server.herokuapp.com/lists/").then((response) => {
      currentArrLengthOnServer = response.data.length;
    //   console.log(currentArrLengthOnServer);
    });
    
    setTimeout(() => {
    listId = currentArrLengthOnServer + 1;
    console.log(listId)
    setNewListId(listId)
    console.log(newListId);
}, 2000)
    let newItems = [
      {
        text: "",
        amount: 0,
        isCompleted: false,
      },
    ];

    axios.post("https://shopping-assistant-json-server.herokuapp.com/lists/", {
      listId,
      newItems,
    });

    // setItems([{}, {}]);
  };

  return (
    <div className="app">
      <img src={logo} style={{maxWidth: 30, display: 'block', margin: '0 auto', padding: "10px 0px 30px 0px"}}/>
      <br />
      {items.map((item, index) => (
        <Item
          key={index}
          index={index}
          item={item}
          completeItem={completeItem}
          removeItem={removeItem}
        />
      ))}
      <br />
      <br />
      <br />
      <div className="addItem">
        <AddItemForm addItem={addItem} />
      </div>


      <div id="share-button" >
      <button 
      onClick={handleNewList} 
    //   disabled={true}
      aria-label="New List"
      >
        Create List
      </button>



      <button 
        
        disabled={true}
        aria-label="Share via Link"
        >
          Share List
        </button>
        
        </div>
        <br />
        <br />
      <ShowNewListID newListId={newListId}/>

      <ShowListID listId={listId} />

    </div>
  );
};

const ShowListID = ({ listId, newListId }) => {
  return (
    <div>
      <div className="share-button" style={{textAlign: "center"}}>

        {/* <div> List-ID: {listId}</div> */}
        
        <a href={"http://shopping-assistent.herokuapp.com/?listId:" + listId}>
          {"#" + listId}
        </a>
      </div>
    </div>
  );
};

const ShowNewListID = ({ newListId }) => {
    if (newListId == 0) {
        return (
            <div></div>
        )
    } else {
        return (
            <div style={{display: 'block', margin: "0 auto", textAlign: "center"}}>
        <a href={"http://shopping-assistent.herokuapp.com/?listId:" + newListId}>
            Open New List 
            </a>
            <br />
            <br />
            </div>
        )
    }
    

}


export default App;
