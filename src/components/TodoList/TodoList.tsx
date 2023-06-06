import React from "react";
import {TaskType, FilterType} from "../../App";
import AddItemForm from "../AddItemForm/AddItemForm";

type TodoListProps = {
    todoListID: string
    tasks: Array<TaskType>
    handleTaskStatusChange: (todoListID: string, id: string) => void
    handleDeleteTask: (todoListID: string, id: string) => void
    handleAddNewTask: (todoListID: string, text: string) => void
    handleFilterChange: (todoListID: string, value: FilterType) => void
    handleDeleteTodoList: (todoListID: string) => void
}
export const TodoList = (props: TodoListProps) => {

    const onAddTaskClick = (title:string) => {
        props.handleAddNewTask(props.todoListID, title);
    };

    return (
        <div>
            <AddItemForm handler={onAddTaskClick}/>
            <button
                onClick={() => props.handleDeleteTodoList(props.todoListID)}
            >
                Delete
            </button>
            <div>
                <button onClick={() => props.handleFilterChange(props.todoListID, 'all')}>ALL</button>
                <button onClick={() => props.handleFilterChange(props.todoListID, 'active')}>ACTIVE</button>
                <button onClick={() => props.handleFilterChange(props.todoListID, 'completed')}>COMPLETED</button>
            </div>
            <ul>
                {props.tasks.map((task: TaskType) => {
                    return <li
                        key={task.id}
                    >
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => props.handleTaskStatusChange(props.todoListID, task.id)}
                        />
                        {task.text}
                        <button
                            onClick={() => props.handleDeleteTask(props.todoListID, task.id)}
                        >
                            Delete
                        </button>
                    </li>
                })}
            </ul>
        </div>
    )
}


