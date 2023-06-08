import React from "react";
import {TaskType, FilterType, TasksStateType} from "../../App";
import AddItemForm from "../AddItemForm/AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../reducers/tasksReducer";

type TodoListProps = {
    todoListID: string
    title:string
    filter:FilterType
    handleFilterChange: (todoListID: string, value: FilterType) => void
    handleDeleteTodoList: (todoListID: string) => void
    handleChangeTodoListTitle:(todoListID:string,newTitle:string)=>void
}
export const TodoList = (props: TodoListProps) => {

    const tasks = useSelector<AppRootStateType,TasksStateType>(state=>state.tasks);
    const dispatch = useDispatch();

    const onAddTaskClick = (title: string) => {
        dispatch(addTaskAC(props.todoListID,title));
    };

    const handleChangeTodoListTitle = (newTitle:string) => {
        props.handleChangeTodoListTitle(props.todoListID,newTitle)
    }

    let tasksToRender = [...tasks[props.todoListID]];
    if(props.filter === 'active') {
        tasksToRender = tasks[props.todoListID].filter(task=>!task.completed)
    }
    if(props.filter === 'completed') {
        tasksToRender = tasks[props.todoListID].filter(task=>task.completed)
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
                {tasksToRender.map((task: TaskType) => {

                    const handleChangeTaskTitle = (newTitle:string) => {
                        dispatch(changeTaskTitleAC(props.todoListID,task.id,newTitle));
                    }

                    return <li
                        key={task.id}
                    >
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => dispatch(changeTaskStatusAC(props.todoListID, task.id,!task.completed))}
                        />
                        <EditableSpan
                            currentTitle={task.title}
                            handleChangeTaskTitle={handleChangeTaskTitle}
                        />
                        <button
                            onClick={() => dispatch(removeTaskAC(props.todoListID, task.id))}
                        >
                            Delete
                        </button>
                    </li>;
                })}
            </ul>
        </div>
    )
}



