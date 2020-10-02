import React from "react";


const Item = ({ item, index, completeItem, removeItem, setColor }) => {
  
  const space: string = " x "
  
  return (
      <section
        className="item"

        //todo: check for screen reader compatibility
        style={{ textDecoration: item.isCompleted ? "line-through" : "" }}
      >
        {item.amount}
        {space}
        {item.text}
  
        <section>
          <button 
          className="editButtons" 
          id="completeButton"
          style={setColor}
          onClick={() => completeItem(index)}
          aria-label='click to mark item as bought'
  
          >✓</button>
  
          <button 
          className="editButtons" 
          id="removeButton"
          style={setColor}
          onClick={() => removeItem(index)}
          aria-label='remove item from list'
  
          >x</button>
          
        </section>
      </section>
    );
  }

export default Item;