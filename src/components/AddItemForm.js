import React, { useState } from "react";
import axios from "axios";

function AddItemForm({ addItem, setColor }) {
  const [value, setValue] = useState({
    text: "",
    amount: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value) return;

    if (parseInt(value.text) != NaN) {
      let itemBarcode = value.text;

      let headers = {
        "User-Agent": "shopping assistant",
        Plattform: "web-app",
        Version: "1.0",
      };

      console.log(itemBarcode);
      let foodAPIUrl = `https://world.openfoodfacts.org/api/v0/product/${itemBarcode}`;

      let foodRequest = axios.get(foodAPIUrl).then((response) => {
        console.log(response);
        let itemNameFromAPI = response.data.product.generic_name;
        console.log(itemNameFromAPI)

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
    console.log(setColor);

    let newValue = e.target.value;
    setValue({
      ...value,
      [name]: newValue,
    });
  };

  let labelText = "Type in item and press Enter or Add-Button...";

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        style={setColor}
        aria-label={labelText}
        aria-required="true"
        placeholder={labelText}
        size="50"
        value={value.text}
        name="text"
        onChange={handleValue}
      />
      <input
        type="number"
        aria-label="Add Amount"
        aria-required="true"
        style={setColor}
        placeholder="Amount"
        size="3"
        name="amount"
        value={value.amount}
        onChange={handleValue}
        style={{ textAlign: "center" }}
      />
      <button
        id="addButton"
        style={{ width: "60%", display: "block", margin: "2em auto" }}
        aria-label="Add"
      >
        +
      </button>
    </form>
  );
}

export default AddItemForm;
