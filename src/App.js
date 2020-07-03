import React, { useState } from "react";
import "./App.css";
import Item from './components/Item';
import AddItemForm from './components/AddItemForm';





function App() {
  const [items, setItems] = useState([
    {
      text: "Eggs",
      amount: 2,
      isCompleted: false
    },
    {
      text: "Milk",
      amount: 3,
      isCompleted: false
    },
    {
      text: "Brachiosaurus",
      amount: 5,

      isCompleted: false
    }
  ]);

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
