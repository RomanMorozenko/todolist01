import React, {useCallback} from 'react';
import {TodoList} from "./components/TodoList/TodoList";
import './App.css';
import AddItemForm from "./components/AddItemForm/AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";
import {
    addTodolistAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./reducers/todoListsReducer";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export type TaskType = {
    id: string
    title: string
    completed: boolean
}

export type TasksStateType = {
    [id: string]: Array<TaskType>
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}

export type FilterType = 'all' | 'active' | 'completed';

function App() {
    console.log('App')
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const dispatch = useDispatch();


    const handleDeleteTodoList = useCallback((todoListID: string) => {
        dispatch(removeTodolistAC(todoListID));
    },[dispatch])

    const handleAddNewTodoList = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])

    const handleChangeTodoListTitle = useCallback((todoListID: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todoListID, newTitle))
    },[dispatch])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid container style={{padding:'20px'}}>
                    <AddItemForm handler={handleAddNewTodoList}/>
                </Grid>
                <Grid container>
                    {todoLists.map(todoList => {

                        return <Grid key={todoList.id} item>
                            <Paper style={{padding:'10px'}}>
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
            </Container>
        </div>
    );
}

export default App;




