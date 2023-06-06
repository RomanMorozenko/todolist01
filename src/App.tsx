import React, {useState} from 'react';
import {TodoList} from "./components/TodoList";
import {v4} from "uuid";
import './App.css';

export type TaskType = {
    id:string
    text:string
    completed:boolean
}

export type FilterType = 'all' | 'active' | 'completed';

function App() {

    const [filter,setFilter] = useState<FilterType>('all')
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

    const handleFilterChange = (value:FilterType) => {
        setFilter(value)
    }


    return (
    <div className="App">
        <TodoList
            tasks={filter === 'all'
                ? tasks
                : filter === 'completed'
                    ? tasks.filter(task=>task.completed)
                    : tasks.filter(task=>!task.completed)
            }
            handleTaskStatusChange={handleTaskStatusChange}
            handleDeleteTask={handleDeleteTask}
            handleAddNewTask={handleAddNewTask}
            handleFilterChange={handleFilterChange}
        />
    </div>
  );
}

export default App;




