import React, { useState, useEffect } from "react";
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import "./App.css";
import Item from "./components/Item";
import AddItemForm from "./components/AddItemForm";
import ShowListID from "./components/ShowListID";
import ShowNewListID from "./components/ShowNewListID";
import axios from "axios";
import logo from "./img/logo.png";
import listService from "./services/lists";

const App = () => {
  const [items, setItems] = useState([{ text: "...loading..." }]);
  const [newListId, setNewListId] = useState(0);
  const [darkMode, setDarkMode] = useState({
    darkModeOn: false,
    backgroundColor: "fff",
  });

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
    listService.getAll(listId).then((initialList) => {
      console.log(initialList);
      setItems(initialList.newItems);
    });
  }, []);

  const addItem = (text, amount) => {
    const newItems = [...items, { text, amount, isCompleted: false }];

    console.log(newItems);
    console.log({ text, amount });

    listService.update(listId, { newItems });

    // axios.put(
    //   "https://shopping-assistant-json-server.herokuapp.com/lists/" + listId,
    //   {
    //     newItems,
    //   }
    // );

    setItems(newItems);
  };

  const completeItem = (index) => {
    const newItems = [...items];
    newItems[index].isCompleted = !newItems[index].isCompleted;

    listService.update(listId, { newItems });

    setItems(newItems);
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);

    listService.update(listId, { newItems });

    setItems(newItems);
  };

  const handleNewList = () => {
    let currentArrLengthOnServer = null;
    axios
      .get("https://shopping-assistant-json-server.herokuapp.com/lists/")
      .then((response) => {
        currentArrLengthOnServer = response.data.length;
        console.log(currentArrLengthOnServer);
        listId = currentArrLengthOnServer + 1;
        console.log(listId);
        setNewListId(listId);
        console.log(newListId);
      });

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


  const handleDarkMode = () => {
    if (darkMode.darkModeOn == false) {   
      let newColor = { 
        darkModeOn: true,  
        backgroundColor: "#222" };
        setDarkMode(newColor);

    } else {
        console.log("yo 1");

      let newColor = { 
        darkModeOn: false,  
        backgroundColor: "#fff" };
      setDarkMode(newColor);

    }
  };

  return (
    <div className="app" style={{backgroundColor: darkMode.backgroundColor}}>
      <img
        src={logo}
        style={{
          maxWidth: 30,
          display: "block",
          margin: "0 auto",
          padding: "10px 0px 30px 0px",
        }}
      />
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
      <div>
        <AddItemForm addItem={addItem} />
      </div>
      
      <div id="share-button">
        <button
          onClick={handleNewList}
          //   disabled={true}
          aria-label="New List"
        >
          Create List
        </button>
      </div>
      <br />
      <ShowNewListID newListId={newListId} />

      <ShowListID listId={listId} />
      <br />
      <button id="share-button" onClick={handleDarkMode}>☀</button>
    </div>
  );
};

export default App;
