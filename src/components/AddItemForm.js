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

  let labelText = 'Type in item and press Enter or Add-Button...'

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
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
        placeholder="Amount"
        size="3"
        name="amount"
        value={value.amount}
        onChange={handleValue}
      />
      <button>Add</button>
    </form>
  );
}

export default AddItemForm;
