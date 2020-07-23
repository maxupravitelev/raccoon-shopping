import React from "react";


function Item({ item, index, completeItem, removeItem, setColor }) {
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
          className="editButtons" style={setColor}
          onClick={() => completeItem(index)}
          aria-label='click to mark item as bought'
  
          >✓</button>
  
          <button 
          className="editButtons" style={setColor}
          onClick={() => removeItem(index)}
          aria-label='remove item from list'
  
          >x</button>
          
        </section>
      </section>
    );
  }

export default Item;