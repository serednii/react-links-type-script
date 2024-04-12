import { TodoItem } from "./TodoItem";
import { ITodo } from "./types/data";

interface ITodoListProps {
    items: ITodo[];
    name: string;
    removeTodo: (id: number) => void;
    toggleTodo: (id: number) => void;
}

const TodoList: React.FC<ITodoListProps> = (props) => {
    const { items, removeTodo, toggleTodo } = props;
    return <div>
        {
            items.map(todo => <TodoItem
                key={todo.id}
                {...todo}
                name={props.name}
                removeTodo={removeTodo}
                toggleTodo={toggleTodo}
            />)
        }
    </div>
}

export { TodoList }