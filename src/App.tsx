import React, { useState, useEffect } from "react";
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import "./App.css";
import Item from "./components/Item";
import AddItemForm from "./components/AddItemForm";
import ShareList from "./components/ShareList";
import ShowNewListID from "./components/ShowNewListID";
import axios from "axios";
import logoLight from "./img/logo.png";
import logoInverse from "./img/logoInverse.png";
import listService from "./services/lists";

const App = () => {
  const [items, setItems] = useState([{ text: "...loading..." }]);
  const [newListId, setNewListId] = useState(0);
  const [darkMode, setDarkMode] = useState({
    darkModeOn: false,
    backgroundColor: "#fff",
    buttonBackgroundColor: "#333",
    fontColorItems: "black",
    fontColorButtons: "white",
    logo: logoLight,
  });

  // work around until react routes are implemented
  let listId = null;

  const queryString = window.location.search;
  if (queryString !== "") {
    if (queryString.indexOf(":") !== -1) {
      listId = queryString.split(":")[1];
    }
  } else {
    listId = 0;
  }

  // listId = '5f214b299c7c213e069f2a52'

  useEffect(() => {
    listService.getAll(listId).then((initialList) => {
      console.log(initialList);
      setItems(initialList);
    });
  // eslint-disable-next-line
  }, []);


  const addItem = (text, amount) => {
    
    const newItem = {
      text, 
      amount,
      "listId": listId, 
      isCompleted: false,
      "_id": "temp"
    }
    
    

    listService.create(newItem).then((res) => {
      console.log(res)

      newItem["_id"] = res.itemId

      const newItems = [...items, newItem];


      setItems(newItems);


    });


  };

  const completeItem = (index) => {
    const newItems: any = [...items];
    newItems[index].isCompleted = !newItems[index].isCompleted;

    listService.update(listId, { newItems });

    setItems(newItems);
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);

    listService.remove(items[index]["_id"]);
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
  };

  const handleDarkMode = () => {
    if (darkMode.darkModeOn === false) {
      let newColor = {
        darkModeOn: true,
        backgroundColor: "#222",
        buttonBackgroundColor: "#fff",
        fontColorItems: "#fff",
        fontColorButtons: "#222",
        logo: logoInverse,
        body: changeBackground("#fff")
      };
      setDarkMode(newColor);
    } else {
      let newColor = {
        darkModeOn: false,
        backgroundColor: "#fff",
        buttonBackgroundColor: "#222",
        fontColorItems: "#222",
        fontColorButtons: "#fff",
        logo: logoLight,
        body: changeBackground("#222")
      };
      setDarkMode(newColor);
    }
  };


  // changing body background color
  const changeBackground = (color) => {
    document.body.style.background = color;
  }

  let buttonEditItemsStyle = {
    backgroundColor: darkMode.backgroundColor,
    color: darkMode.fontColorItems,
  };
  let buttonNavStyle = {
    backgroundColor: darkMode.buttonBackgroundColor,
    color: darkMode.fontColorButtons,
  };

  return (
    <div className="app" style={buttonEditItemsStyle}>
      <img
        src={darkMode.logo}
        alt="raccoon logo"
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
          setColor={buttonEditItemsStyle}
        />
      ))}
      <br />
      <br />
      <br />
      <div>
        <AddItemForm
          addItem={addItem}
          setColor={{ buttonEditItemsStyle, buttonNavStyle }}
        />
      </div>

      <div id="share-button">
        <button
          onClick={handleNewList}
          style={buttonNavStyle}
          //   disabled={true}
          aria-label="New List"
        >
          Create List
        </button>
      </div>
      <br />
      
      {/* <ShowNewListID newListId={newListId} setColor={buttonNavStyle} /> */}
      <ShowNewListID newListId={newListId} />


      <ShareList listId={listId} setColor={buttonNavStyle} />
      <br />
      <button
        id="darkModeButton"
        onClick={handleDarkMode}
        style={buttonNavStyle}
      >
        ☀
      </button>
    </div>
  );
};

export default App;
