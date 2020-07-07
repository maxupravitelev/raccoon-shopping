import React, { useState, useEffect } from "react";
import "./App.css";
import Item from './components/Item';
import AddItemForm from './components/AddItemForm';
import axios from 'axios';





function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // console.log('effect')
    axios
      .get('https://shopping-assistant-json-server.herokuapp.com/db')
      .then(response => {
        // console.log('promise fulfilled')
        console.log(response.data.user)
        setItems(response.data.user)
      })
  }, [])


  const addItem = (text, amount) => {
    const newItems = [...items, { text, amount }];
    setItems(newItems);
  };

  const completeItem = index => {
    const newItems = [...items];
    newItems[index].isCompleted = true;
    setItems(newItems);
  };

  const removeItem = index => {
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

        
        
        <div className="share-button">
        <button id="share-button" disabled>Share via link</button>
      </div>

      <div>

      </div>


    </div>
  );
}

export default App;
