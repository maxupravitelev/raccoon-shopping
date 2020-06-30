import React, { useState } from "react";
import "./App.css";

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <section
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.amount}
      x
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
    addTodo(value.text, value.amount);
    setValue({
        text: "",
        amount: 0
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
  const [todos, setTodos] = useState([
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
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
              <div className="addItem">

        <TodoForm addTodo={addTodo} />
        </div>

        
        
        <div className="share-button">
        <button id="share-button">Share via link</button>
      </div>

      <div>

      </div>


    </div>
  );
}

export default App;

// built upon: https://scotch.io/tutorials/build-a-react-to-do-app-with-react-hooks-no-class-components?utm_source=dormosheio&utm_campaign=dormosheio