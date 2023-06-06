import React, {useState} from "react";
import {TaskType,FilterType} from "../App";

type TodoListProps = {
    tasks:Array<TaskType>
    handleTaskStatusChange:(id:string)=>void
    handleDeleteTask:(id:string)=>void
    handleAddNewTask:(text:string)=>void
    handleFilterChange:(value:FilterType)=>void
}
export const TodoList = (props:TodoListProps) => {

    const [newTaskText,setNewTaskText] = useState('');

    const onAddTaskClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        if(newTaskText.trim() !== '') {
            props.handleAddNewTask(newTaskText.trim());
            setNewTaskText('');
        }
    };

    return (
        <div>
            <form>
                <input
                    type='text'
                    value={newTaskText}
                    onChange={e=>setNewTaskText(e.target.value)}
                    onKeyDown={e=> e.code === 'Enter' && onAddTaskClick(e)}
                />
                <button
                    onClick={e=>onAddTaskClick(e)}
                >+</button>
            </form>
            <div>
                <button onClick={()=>props.handleFilterChange('all')}>ALL</button>
                <button onClick={()=>props.handleFilterChange('active')}>ACTIVE</button>
                <button onClick={()=>props.handleFilterChange('completed')}>COMPLETED</button>
            </div>
            <ul>
                {props.tasks.map((task:TaskType)=>{
                    return <li
                        key={task.id}
                    >
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={()=>props.handleTaskStatusChange(task.id)}
                        />
                        {task.text}
                        <button
                            onClick={()=>props.handleDeleteTask(task.id)}
                        >
                            Delete
                        </button>
                    </li>
                })}
            </ul>
        </div>
    )
}