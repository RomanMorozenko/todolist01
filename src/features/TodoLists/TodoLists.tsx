import React, {useCallback} from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {TodoList} from "./TodoList/TodoList";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {changeTodolistTitleTC, removeTodolistTC, TodoListType} from "./todoListsReducer";

function TodoLists() {

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists);
    const dispatch = useAppDispatch();

    const handleDeleteTodoList = useCallback((todoListID: string) => {
        dispatch(removeTodolistTC(todoListID));
    }, [dispatch])

    const handleChangeTodoListTitle = useCallback((todoListID: string, newTitle: string) => {
        dispatch(changeTodolistTitleTC(todoListID, newTitle))
    }, [dispatch])


    return (
            <Grid container>
            {todoLists.map(todoList => {
                return <Grid key={todoList.id} item>
                    <Paper style={{padding: '10px'}}>
                        <TodoList
                            key={todoList.id}
                            todoListID={todoList.id}
                            title={todoList.title}
                            filter={todoList.filter}
                            handleDeleteTodoList={handleDeleteTodoList}
                            handleChangeTodoListTitle={handleChangeTodoListTitle}
                        />
                    </Paper>
                </Grid>
            })}
            </Grid>
    );
}

export default TodoLists;