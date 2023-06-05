import React, {useState} from 'react';
import {v4} from "uuid";

import './App.css';

type TaskType = {
    id:string
    text:string
    completed:boolean
}

function App() {
    const [tasks,setTasks] = useState<Array<TaskType>>([
        {
            id:v4(),
            text:'Buy some bread',
            completed:false
        },
        {
            id:v4(),
            text:'Feed the cat',
            completed:true
        },
        {
            id:v4(),
            text:'Work on the project',
            completed:false
        },
    ]);

    const handleAddNewTask = (text:string) => {
        const newTask:TaskType = {
            id:v4(),
            text:text,
            completed:false
        }
        setTasks([...tasks,newTask])
    }

    const handleTaskStatusChange = (id:string) => {
        const changedTasks = [...tasks]
        let task = changedTasks.find(task=>task.id===id);
        task && (task.completed = !task.completed);
        setTasks(changedTasks);
    }

    const handleDeleteTask = (id:string) => {
        const changedTasks = tasks.filter(task=>task.id !== id)
        setTasks(changedTasks);
    }


  return (
    <div className="App">
        <TodoList
            tasks={tasks}
            handleTaskStatusChange={handleTaskStatusChange}
            handleDeleteTask={handleDeleteTask}
            handleAddNewTask={handleAddNewTask}
        />
    </div>
  );
}

export default App;

type TodoListProps = {
    tasks:Array<TaskType>
    handleTaskStatusChange:(id:string)=>void
    handleDeleteTask:(id:string)=>void
    handleAddNewTask:(text:string)=>void
}
export const TodoList = (props:TodoListProps) => {

    const [newTaskText,setNewTaskText] = useState('');

    const onAddTaskClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        props.handleAddNewTask(newTaskText);
        setNewTaskText('');
    };

    return (
        <div>
            <form>
                <input
                    type='text'
                    value={newTaskText}
                    onChange={e=>setNewTaskText(e.target.value)}
                />
                <button
                    onClick={e=>onAddTaskClick(e)}
                >+</button>
            </form>
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


