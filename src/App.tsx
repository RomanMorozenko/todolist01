import React, {useState} from 'react';
import {TodoList} from "./components/TodoList/TodoList";
import {v4} from "uuid";
import './App.css';

export type TaskType = {
    id: string
    text: string
    completed: boolean
}

export type TasksStateType = {
    [id:string]:Array<TaskType>
}

export type TodoListType = {
    id: string
    title: string
    filter: string
}

export type FilterType = 'all' | 'active' | 'completed';

function App() {

    const todoListID1 = v4();
    const todoListID2 = v4();

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID1]: [
            {
                id: v4(),
                text: 'Buy some bread',
                completed: false
            },
            {
                id: v4(),
                text: 'Feed the cat',
                completed: true
            },
            {
                id: v4(),
                text: 'Work on the project',
                completed: false
            },
        ],
        [todoListID2]: [
            {
                id: v4(),
                text: 'Hit the gym',
                completed: false
            },
            {
                id: v4(),
                text: 'Call dad',
                completed: false
            },
            {
                id: v4(),
                text: 'Dinner in the restaurant',
                completed: false
            },
        ]
    })
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {
            id: todoListID1,
            title: 'Monday',
            filter: 'all'
        },
        {
            id: todoListID2,
            title: 'Tuesday',
            filter: 'all'
        },
    ])

    const handleAddNewTask = (todoListID:string,text: string) => {
        const newTask: TaskType = {
            id: v4(),
            text: text,
            completed: false
        }

        setTasks({...tasks,[todoListID]:[...tasks[todoListID],newTask]})
    }

    const handleTaskStatusChange = (todoListID:string,id: string) => {
        let task = tasks[todoListID].find(task => task.id === id);
        task && (task.completed = !task.completed);
        setTasks({...tasks,[todoListID]: [...tasks[todoListID] ] } );
    }

    const handleDeleteTask = (todoListID:string,id: string) => {
        setTasks({...tasks,[todoListID]: tasks[todoListID].filter(task => task.id !== id) } );
    }

    const handleDeleteTodoList = (todoListID:string) => {
        const newTodoLists = todoLists.filter(todoList=>todoList.id!==todoListID)
        setTodoLists(newTodoLists);
    }

    return (
        <div className="App">
            {todoLists.map(todoList => {

                const handleFilterChange = (todoListID:string,value: FilterType) => {
                    const currentList = todoLists.find(list=>list.id === todoListID);
                    currentList && (currentList.filter=value)
                    setTodoLists([...todoLists])
                }

                return <TodoList
                    key={todoList.id}
                    todoListID={todoList.id}
                    tasks={todoList.filter === 'all'
                        ? tasks[todoList.id]
                        : todoList.filter === 'completed'
                            ? tasks[todoList.id].filter(task => task.completed)
                            : tasks[todoList.id].filter(task => !task.completed)
                    }
                    handleTaskStatusChange={handleTaskStatusChange}
                    handleDeleteTask={handleDeleteTask}
                    handleAddNewTask={handleAddNewTask}
                    handleFilterChange={handleFilterChange}
                    handleDeleteTodoList={handleDeleteTodoList}
                />
            })}
        </div>
    );
}

export default App;




