import React, {useCallback, useEffect} from 'react';
import './App.css';
import AddItemForm from "../components/AddItemForm/AddItemForm";
import {useAppDispatch} from "./store";
import {addTodolistTC, fetchTodolistsTC} from "../features/TodoLists/todoListsReducer";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TodoLists from "../features/TodoLists/TodoLists";


function App() {

    const dispatch = useAppDispatch();

    useEffect(() => {
        const thunk = fetchTodolistsTC()
        dispatch(thunk)
    }, [])


    const handleAddNewTodoList = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])


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
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm handler={handleAddNewTodoList}/>
                </Grid>
                <TodoLists/>
            </Container>
        </div>
    );
}

export default App;




