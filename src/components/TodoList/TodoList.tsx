import React, {useState} from "react";
import {TaskType,FilterType} from "../../App";
import styles from './todolist.module.css';

type TodoListProps = {
    todoListID:string
    tasks:Array<TaskType>
    handleTaskStatusChange:(todoListID:string,id:string)=>void
    handleDeleteTask:(todoListID:string,id:string)=>void
    handleAddNewTask:(todoListID:string,text:string)=>void
    handleFilterChange:(todoListID:string,value:FilterType)=>void
    handleDeleteTodoList:(todoListID:string)=>void
}
export const TodoList = (props:TodoListProps) => {

    const [newTaskText,setNewTaskText] = useState('');
    const [error,setError] = useState<string|null>(null)

    const onAddTaskClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        if(newTaskText.trim() === '') {
            setError('Type your task...')
            return
        }
        if(newTaskText.trim() !== '') {
            props.handleAddNewTask(props.todoListID,newTaskText.trim());
            setNewTaskText('');
            setError(null)
        }
    };

    return (
        <div>
            <form>
                <input
                    type='text'
                    value={newTaskText}
                    onChange={e=> {
                        setError(null);
                        setNewTaskText(e.target.value);
                    }}
                    onKeyDown={e=> e.code === 'Enter' && onAddTaskClick(e)}
                    className={error?styles.error:''}
                />
                <button
                    onClick={e=>onAddTaskClick(e)}
                >+</button>
            </form>
            <button
                onClick={()=>props.handleDeleteTodoList(props.todoListID)}
            >
                Delete
            </button>
            {error?<h4 className={styles.errorText}>{error}</h4>:<></>}
            <div>
                <button onClick={()=>props.handleFilterChange(props.todoListID,'all')}>ALL</button>
                <button onClick={()=>props.handleFilterChange(props.todoListID,'active')}>ACTIVE</button>
                <button onClick={()=>props.handleFilterChange(props.todoListID,'completed')}>COMPLETED</button>
            </div>
            <ul>
                {props.tasks.map((task:TaskType)=>{
                    return <li
                        key={task.id}
                    >
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={()=>props.handleTaskStatusChange(props.todoListID,task.id)}
                        />
                        {task.text}
                        <button
                            onClick={()=>props.handleDeleteTask(props.todoListID,task.id)}
                        >
                            Delete
                        </button>
                    </li>
                })}
            </ul>
        </div>
    )
}