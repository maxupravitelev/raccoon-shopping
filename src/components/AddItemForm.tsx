import React, { useState } from "react";
import axios from "axios";

const AddItemForm = ({ addItem, setColor }) => {
  const [value, setValue] = useState({
    text: "",
    amount: 0,
    isCompleted: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value) return;

    if (!isNaN(parseInt(value.text))) {
      let itemBarcode = value.text;
      
      //required by OFF API
      let headers: any = {
        'User-Agent': "raccoon assistant",
        'Plattform': "web-app",
        'Version': "0.1",
      };

      console.log(itemBarcode);
      let foodAPIUrl = `https://world.openfoodfacts.org/api/v0/product/${itemBarcode}`;

      axios
        .get(foodAPIUrl, headers)
        .then((response) => {
          console.log(response);
          let itemNameFromAPI = response.data.product.generic_name;
          console.log(itemNameFromAPI);

          addItem(itemNameFromAPI, value.amount);

          setValue({
            text: "",
            amount: 0,
            isCompleted: false,
          });

          return;
        });
    }

    addItem(value.text, value.amount);

    setValue({
      text: "",
      amount: 0,
      isCompleted: false,
    });
  };

  const handleValue = (e) => {
    let name = e.target.name;
    // console.log(setColor);

    let newValue = e.target.value;
    setValue({
      ...value,
      [name]: newValue,
    });
  };

  let labelText = "Type in item and press Enter or Add-Button...";
  // console.log(setColor)
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        style={setColor.buttonEditItemsStyle}
        aria-label={labelText}
        aria-required="true"
        placeholder={labelText}
        size={50}   // before ts: string
        value={value.text}
        name="text"
        onChange={handleValue}
      />
      <input
        type="number"
        aria-label="Add Amount"
        aria-required="true"
        style={setColor.buttonEditItemsStyle}
        placeholder="Amount"
        size={3}  // before ts: string
        name="amount"
        value={value.amount}
        onChange={handleValue}
      />
      <button
        id="addButton"
        className="addButton"
        style={setColor.buttonNavStyle}
        aria-label="Add"
      >
        +
      </button>
    </form>
  );
}

export default AddItemForm;
