import 'todomvc-app-css/index.css';
import React, { useState } from 'react';
import uuid from './utils';

const FILTER_TITLES = ['All', 'Active', 'Completed'];

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('All');

  const numActive = todos.filter((todo) => todo.completed === false).length;
  const filteredTodos =
    filter === 'All'
      ? todos
      : filter === 'Active'
      ? todos.filter((todo) => todo.completed === false)
      : todos.filter((todo) => todo.completed !== false);

  function addTodo(event) {
    event.preventDefault();

    setTodos([
      ...todos,
      {
        id: uuid(),
        completed: false,
        text: newTodo,
      },
    ]);

    setNewTodo('');
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function clearCompleted() {
    setTodos(todos.filter((todo) => todo.completed === false));
  }

  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>TodoMVC</h1>
          <form onSubmit={addTodo}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
              value={newTodo}
              onChange={(event) => setNewTodo(event.target.value)}
            />
          </form>
        </header>
        {/* This section should be hidden by default and shown when there are todos */}
        <section className="main">
          <input id="toggle-all" className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {/* These are here just to show the structure of the list items */}
            {/* List items should get the className `editing` when editing and `completed` when marked as completed */}
            {filteredTodos.map((todo) => (
              <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <label>{todo.text}</label>
                  <button
                    className="destroy"
                    onClick={() => deleteTodo(todo.id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
        {/* This footer should hidden by default and shown when there are todos */}
        <footer className="footer">
          {/* This should be `0 items left` by default */}
          <span className="todo-count">
            <strong>{numActive}</strong> item left
          </span>
          {/* Remove this if you don't implement routing */}
          <ul className="filters">
            {FILTER_TITLES.map((filterName) => (
              <li key={filterName}>
                {/* eslint-disable jsx-a11y/anchor-is-valid */}
                <a
                  className={filter === filterName ? 'selected' : ''}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setFilter(filterName)}
                >
                  {filterName}
                </a>
                {/* eslint-enable jsx-a11y/anchor-is-valid */}
              </li>
            ))}
          </ul>
          {/* Hidden if no completed items are left ↓ */}
          <button className="clear-completed" onClick={clearCompleted}>
            Clear completed
          </button>
        </footer>
      </section>
    </>
  );
}
