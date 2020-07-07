import React, { useState } from 'react';
import axios from 'axios'


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
        
        let itemObject = {
            text: value.text, 
            amount: value.amount,
            isCompleted: false
        }

        // addItem(value.text, value.amount);
        
        // addItem(itemObject);        
        
        
        
        axios
            .post('https://shopping-assistant-json-server.herokuapp.com/items', itemObject)
            .then(response => {
                addItem(value.text, value.amount);
            })
        
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



    //   const handleValue = (e) => {
    //       let name = e.target.name;
    //       let newValue = e.target.value;
    //     // console.log(name, newValue)
        
    //     const itemObject = {
    //         ...value,
    //         [name]: newValue           
    //     }


        

    //   }
    
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

export default AddItemForm;