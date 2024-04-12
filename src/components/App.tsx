import React, { useEffect, useRef, useState } from 'react';
import { ITodo } from './types/data';
import { TodoList } from './TodoList';

const App: React.FC = () => {
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState<ITodo[]>([])
  const inputRef = useRef<HTMLInputElement>(null);
  let name: string = '';

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value)
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter')
      addTodo();
  }

  const removeTodo = (id: number): void => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id: number): void => {
    setTodos(todos.map(todo => {
      if (todo.id !== id) return todo
      return {
        ...todo,
        complete: !todo.complete
      }
    }))
  }


  const addTodo = () => {
    if (value) {
      setTodos([...todos, {
        id: Date.now(),
        title: value,
        complete: false
      }])
      setValue('')
    }
  }

  name = 'colorado';

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [])

  return (
    <div className="App">
      <div>
        <input value={value} onChange={handleChange} onKeyDown={handleKeyDown} ref={inputRef}></input>
        <button onClick={addTodo}>Add</button>
      </div>
      <TodoList items={todos} name={name} removeTodo={removeTodo} toggleTodo={toggleTodo}></TodoList>
    </div>
  );
}

export { App };
