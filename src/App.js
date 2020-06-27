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
        class="completeButton"
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
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        placeholder="Type in Item and press Enter..."
        size="70"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
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

  const addTodo = text => {
    const newTodos = [...todos, { text }];
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
        <div id="box-container">
  <div id="box-1"><p></p></div>
  <div id="box-2"><p></p></div>

</div>
      </div>

    </div>
  );
}

export default App;

// built upon: https://scotch.io/tutorials/build-a-react-to-do-app-with-react-hooks-no-class-components?utm_source=dormosheio&utm_campaign=dormosheio