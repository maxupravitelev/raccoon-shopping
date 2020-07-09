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
    axios.get("http://localhost:3001/lists/" + listId).then((response) => {
      console.log("promise fulfilled");
      console.log(response.data);
      setItems(response.data.newItems);
    });
  }, []);

  const addItem = (text, amount) => {
    const newItems = 
        [...items, 
        { text, 
            amount,
            isCompleted: false },
        ];

    console.log(newItems);
    console.log({ text, amount });

    axios.put("http://localhost:3001/lists/" + listId, {
      newItems,
    });

    setItems(newItems);
  };

  const completeItem = (index) => {
    const newItems = [...items];
    newItems[index].isCompleted = true;

    axios.put("http://localhost:3001/lists/" + listId, {
        newItems,
      });

    setItems(newItems);
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);


    axios.put("http://localhost:3001/lists/" + listId, {
        newItems,
      });

    setItems(newItems);
  };

  const handleNewList = () => {
    let currentArrLengthOnServer = null;
    axios.get("http://localhost:3001/lists/").then((response) => {
      currentArrLengthOnServer = response.data.length;
      console.log(currentArrLengthOnServer);
    });
    listId = currentArrLengthOnServer + 1;
    let newItems = {
      listId: listId,
      newItems: [ {} ],
    };

    axios.post("http://localhost:3001/lists/", {
        newItems,
    });

    setItems([{},{}]);


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

      

      <button id="share-button" onClick={handleNewList}>New List</button>
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
        <a href={"http://localhost:3000/?listId:" + listId}>
          {"http://localhost:3000/?listId:" + listId}
        </a>
     
      </div>
    </div>
  );
};

export default App;
