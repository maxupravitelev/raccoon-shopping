import React from "react";


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

export default Item;