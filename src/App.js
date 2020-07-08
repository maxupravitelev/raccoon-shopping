import React, { useState, useEffect } from "react";
import "./App.css";
import Item from "./components/Item";
import AddItemForm from "./components/AddItemForm";
import axios from "axios";

const App = () => {
  const [items, setItems] = useState([{ text: "...loading..." }]);

  useEffect(() => {
    // console.log('effect')
    axios
      .get("https://shopping-assistant-json-server.herokuapp.com/lists/1/")
      .then((response) => {
        // console.log('promise fulfilled')
        console.log(response.data);
        setItems(response.data.items);
      });
  }, []);

  const addItem = (text, amount) => {
    const newItems = [...items, { text, amount }];

    axios.post("https://shopping-assistant-json-server.herokuapp.com/lists/1/items/", {
      text,
      amount,
    });

    setItems(newItems);
  };

  const completeItem = (index) => {
    const newItems = [...items];
    newItems[index].isCompleted = true;
    setItems(newItems);
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
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

      <ShowListID />
    </div>
  );
};

// work around until react routes are implemented
const ShowListID = () => {
  const queryString = window.location.search;

  console.log(queryString);

  //check for the colon
  if (queryString.indexOf(":") !== -1) {
    //split and get
    var listId = queryString.split(":")[1];
  }
  return (
    <div>
      <br />
      

      <div className="share-button">
        <button id="share-button" disabled>
          Share via link
        </button>
      </div>
      <div> List-ID: {listId}</div>
    </div>
  );
};

export default App;
