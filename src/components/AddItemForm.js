import React, { useState } from "react";

function AddItemForm({ addItem }) {
  const [value, setValue] = useState({
    text: "",
    amount: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value) return;

    let itemObject = {
      text: value.text,
      amount: value.amount,
      isCompleted: false,
    };

    addItem(value.text, value.amount);

    setValue({
      text: "",
      amount: 0,
      isCompleted: false,
    });
  };

  const handleValue = (e) => {
    let name = e.target.name;
    let newValue = e.target.value;
    setValue({
      ...value,
      [name]: newValue,
    });
  };

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
      />
      <input
        type="number"
        placeholder="Amount"
        size="3"
        min="1"
        name="amount"
        value={value.amount}
        onChange={handleValue}
      />
      <button>Add</button>
    </form>
  );
}

export default AddItemForm;
