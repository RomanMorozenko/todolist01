import React from "react";
import {TaskType, FilterType} from "../../App";
import AddItemForm from "../AddItemForm/AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";

type TodoListProps = {
    todoListID: string
    tasks: Array<TaskType>
    title:string
    handleTaskStatusChange: (todoListID: string, id: string) => void
    handleDeleteTask: (todoListID: string, id: string) => void
    handleAddNewTask: (todoListID: string, text: string) => void
    handleFilterChange: (todoListID: string, value: FilterType) => void
    handleDeleteTodoList: (todoListID: string) => void
    handleChangeTaskTitle: (todoListID: string, taskID: string, newTitle: string) => void
    handleChangeTodoListTitle:(todoListID:string,newTitle:string)=>void
}
export const TodoList = (props: TodoListProps) => {

    const onAddTaskClick = (title: string) => {
        props.handleAddNewTask(props.todoListID, title);
    };

    const handleChangeTodoListTitle = (newTitle:string) => {
        props.handleChangeTodoListTitle(props.todoListID,newTitle)
    }

    return (
        <div>
            <EditableSpan currentTitle={props.title} handleChangeTaskTitle={handleChangeTodoListTitle}/>
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

                    const handleChangeTaskTitle = (newTitle:string) => {
                        props.handleChangeTaskTitle(props.todoListID,task.id,newTitle)
                    }

                    return <li
                        key={task.id}
                    >
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => props.handleTaskStatusChange(props.todoListID, task.id)}
                        />
                        <EditableSpan
                            currentTitle={task.title}
                            handleChangeTaskTitle={handleChangeTaskTitle}
                        />
                        <button
                            onClick={() => props.handleDeleteTask(props.todoListID, task.id)}
                        >
                            Delete
                        </button>
                    </li>;
                })}
            </ul>
        </div>
    )
}



