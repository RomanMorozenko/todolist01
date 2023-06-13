import React, {useCallback} from "react";
import {TaskType, FilterType} from "../../App";
import AddItemForm from "../AddItemForm/AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import {addTaskAC} from "../../reducers/tasksReducer";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {changeTodolistFilterAC} from "../../reducers/todoListsReducer";
import {Task} from "../Task/Task";

type TodoListProps = {
    todoListID: string
    title:string
    filter:FilterType
    handleDeleteTodoList: (todoListID: string) => void
    handleChangeTodoListTitle:(todoListID:string,newTitle:string)=>void
}
export const TodoList = React.memo((props: TodoListProps) => {

    console.log("Todolist"+ props.todoListID)

    const tasks = useSelector<AppRootStateType,TaskType[]>(state=>state.tasks[props.todoListID]);
    const dispatch = useDispatch();

    const FilterButtonStyles = {
        maxWidth: '100px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'
    }

    const handleFilterChange = (todolistID:string,value: FilterType) => {
        dispatch(changeTodolistFilterAC(props.todoListID, value))
    }

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(props.todoListID,title));
    },[dispatch,props.todoListID])

    const handleChangeTodoListTitle = useCallback((newTitle:string) => {
        props.handleChangeTodoListTitle(props.todoListID,newTitle)
    },[props.handleChangeTodoListTitle,props.todoListID])

    let tasksToRender = [...tasks];
    if(props.filter === 'active') {
        tasksToRender = tasks.filter(task=>!task.completed)
    }
    if(props.filter === 'completed') {
        tasksToRender = tasks.filter(task=>task.completed)
    }

    return (
        <div>
            <EditableSpan currentTitle={props.title} handleChangeTitle={handleChangeTodoListTitle}/>
            <IconButton aria-label="delete" onClick={() => props.handleDeleteTodoList(props.todoListID)}>
                <DeleteIcon />
            </IconButton>
            <AddItemForm handler={addTask}/>
            <Stack direction="row">
                <Button
                    style={FilterButtonStyles}
                    onClick={() => handleFilterChange(props.todoListID, 'all')}
                    variant={props.filter === 'all' ? "contained" : "outlined"}
                    color="secondary"
                >
                    ALL
                </Button>
                <Button
                    style={FilterButtonStyles}
                    onClick={() => handleFilterChange(props.todoListID, 'active')}
                    variant={props.filter === 'active' ? "contained" : "outlined"}
                    color="success"
                >
                    ACTIVE
                </Button>
                <Button
                    style={FilterButtonStyles}
                    onClick={() => handleFilterChange(props.todoListID, 'completed')}
                    variant={props.filter === 'completed' ? "contained" : "outlined"}
                    color="error"
                >
                    COMPLETED
                </Button>
            </Stack>
            <ul>
                {tasksToRender.map((task: TaskType) => {
                    return <Task
                        key={task.id}
                        todolistID={props.todoListID}
                        taskID={task.id}
                        completed={task.completed}
                        title={task.title}
                    />
                })}
            </ul>
        </div>
    )
});




