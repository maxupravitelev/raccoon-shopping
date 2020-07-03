import React, { useState } from "react";
import "./App.css";

function Item({ item, index, completeItem, removeitem }) {
  return (
    <section
      className="item"
      style={{ textDecoration: item.isCompleted ? "line-through" : "" }}
    >
      {item.amount}
      x
      {item.text}

      <section>
        <button 
        className="completeButton"
        onClick={() => completeItem(index)}
        aria-label='click to mark item as bought'

        >Bought</button>

        <button 
        onClick={() => removeitem(index)}
        aria-label='remove item from list'

        >x</button>
        
      </section>
    </section>
  );
}

function AddItemForm({ addItem }) {
//   const [value, setValue] = useState("");
//   const [amount, setAmount] = useState(0);

// const [value, setValue] = useState("");

const [value, setValue] = useState({
    text: "",
    amount: 0
});


  const handleSubmit = e => {
    e.preventDefault();

    if (!value) return;
    addItem(value.text, value.amount);
    setValue({
        text: "",
        amount: 0,
        isCompleted: false
    });
  };

  const handleValue = (e) => {
      let name = e.target.name;
      let newValue = e.target.value;
    // console.log(name, newValue)
      setValue({
          ...value,
          [name]: newValue
      })
      console.log(value)
  }

  return (
    <form onSubmit={handleSubmit}>
    <input
      type="text"
      className="input"
      placeholder="Type in item and press Enter or Add-Button..."
      size="50"
      value={value.text}
      name="text"
      onChange={handleValue}

    //   onChange={e => setValue(e.target.value)}
    //   onClick={e => setValue(e.target.value)}
    />
    <input 
      type="number"
      placeholder="Amount"
      size="3"
      min="1"
      name="amount"
      value={value.amount}
      onChange={handleValue}

    //   onChange={e => setValue(e.target.value)}
      // onClick={e => setValue(e.target.value.amount)}
    />
      <button
        
      >Add</button>
    </form>
    
  );
}

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
