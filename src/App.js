import React, { useState, useEffect } from "react";
import "./App.css";
import Item from "./components/Item";
import AddItemForm from "./components/AddItemForm";
import axios from "axios";

const App = () => {
  const [items, setItems] = useState([{ text: "...loading..." }]);

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
    // console.log('effect')
    axios.get("https://shopping-assistant-json-server.herokuapp.com/lists/" + listId).then((response) => {
      console.log("promise fulfilled");
      console.log(response.data);
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
    newItems[index].isCompleted = true;

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
    listId = currentArrLengthOnServer + 1;
    console.log(listId)
 
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

    setItems([{}, {}]);
  };

  return (
    <div className="app">
      {items.map((item, index) => (
        <Item
          key={index}
          index={index}
          item={item}
          completeItem={completeItem}
          removeItem={removeItem}
        />
      ))}
      <div className="addItem">
        <AddItemForm addItem={addItem} />
      </div>

      <button id="share-button" onClick={handleNewList}>
        New List
      </button>
      <ShowListID listId={listId} />
    </div>
  );
};

const ShowListID = ({ listId }) => {
  return (
    <div>
      <div className="share-button">
        <button id="share-button" disabled>
          Share via link
        </button>
        <div> List-ID: {listId}</div>
        link to list:
        <a href={"http://shopping-assistent.herokuapp.com/?listId:" + listId}>
          {"http://shopping-assistent.herokuapp.com/listId:" + listId}
        </a>
      </div>
    </div>
  );
};

export default App;
