import React, { useState } from "react";
import "./App.css";

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <section
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}

      <section>
        <button 
        className="completeButton"
        onClick={() => completeTodo(index)}
        aria-label='click to mark item as bought'

        >Bought</button>

        <button 
        onClick={() => removeTodo(index)}
        aria-label='remove item from list'

        >x</button>
        
      </section>
    </section>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue, amount, setAmount] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value, amount);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        placeholder="Type in item and press Enter or Add-Button..."
        size="50"
        value={value}
        // onChange={e => setValue(e.target.value)}
        onChange={e => setValue(e.target.value)}
        onClick={e => setValue(e.target.value)}
      />
      <input 
        type="number"
        placeholder="Amount"
        size="3"
        value={amount}
        // onChange={e => setValue(e.target.amount)}
      />
      <button
        
      >Add</button>
    </form>
    
  );
}

function App() {
  const [todos, setTodos] = useState([
    {
      text: "Eggs",
      isCompleted: false
    },
    {
      text: "Milk",
      isCompleted: false
    },
    {
      text: "Brachiosaurus",
      isCompleted: false
    }
  ]);

  const addTodo = (text, amount) => {
    const newTodos = [...todos, { text, amount }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
        <div className="share-button">
        <button id="share-button">Share via link</button>
        </div>
      </div>

    </div>
  );
}

export default App;

// built upon: https://scotch.io/tutorials/build-a-react-to-do-app-with-react-hooks-no-class-components?utm_source=dormosheio&utm_campaign=dormosheio