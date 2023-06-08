import React from 'react';
import {TodoList} from "./components/TodoList/TodoList";
import './App.css';
import AddItemForm from "./components/AddItemForm/AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./reducers/todoListsReducer";

export type TaskType = {
    id: string
    title: string
    completed: boolean
}

export type TasksStateType = {
    [id:string]:Array<TaskType>
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}

export type FilterType = 'all' | 'active' | 'completed';

function App() {
    const todoLists = useSelector<AppRootStateType,Array<TodoListType>>(state=>state.todolists)
    const dispatch = useDispatch();


    const handleDeleteTodoList = (todoListID:string) => {
        dispatch(removeTodolistAC(todoListID));
    }

    const handleAddNewTodoList = (title:string) => {
        dispatch(addTodolistAC(title))
    }

    const handleChangeTodoListTitle = (todoListID:string,newTitle:string) => {
        dispatch(changeTodolistTitleAC(todoListID,newTitle))
    }

    return (
        <div className="App">
            <AddItemForm handler={handleAddNewTodoList}/>
            {todoLists.map(todoList => {

                const handleFilterChange = (todoListID:string,value: FilterType) => {
                    dispatch(changeTodolistFilterAC(todoListID,value))
                }

                return <TodoList
                    key={todoList.id}
                    todoListID={todoList.id}
                    title={todoList.title}
                    filter={todoList.filter}
                    handleFilterChange={handleFilterChange}
                    handleDeleteTodoList={handleDeleteTodoList}
                    handleChangeTodoListTitle={handleChangeTodoListTitle}
                />
            })}
        </div>
    );
}

export default App;




