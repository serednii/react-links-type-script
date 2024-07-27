import { ITodo } from "./types/data";

interface ITodoListProps extends ITodo {
  name: string;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

const TodoItem: React.FC<ITodoListProps> = (props) => {
  const { id, title, complete, name, toggleTodo, removeTodo } = props;

  return (
    <div>
      <input
        type="checkbox"
        onChange={() => toggleTodo(id)}
        checked={complete}
      />
      <span
        style={{
          display: "inline-block",
          margin: "0 10px",
          fontSize: "2rem",
          color: "green",
        }}
      >
        {title}
      </span>
      <button
        onClick={() => removeTodo(id)}
        style={{
          fontSize: "2rem",
          background: "transparent",
          border: "none",
          outline: "none",
          color: "red",
        }}
      >
        x
      </button>
    </div>
  );
};

export { TodoItem };
