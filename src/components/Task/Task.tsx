import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../reducers/tasksReducer";
import Checkbox from "@mui/material/Checkbox";
import EditableSpan from "../EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {useCallback} from "react";


type TaskPropsType = {
    todolistID:string
    taskID:string
    completed:boolean
    title:string
}

export const Task = React.memo((props:TaskPropsType) => {
    const dispatch = useDispatch();

    const handleChangeTaskTitle = useCallback((newTitle:string) => {
        dispatch(changeTaskTitleAC(props.todolistID,props.taskID,newTitle));
    },[dispatch,props.todolistID,props.taskID])

    return <li
    >
        <Checkbox
            checked={props.completed}
            onChange={() => dispatch(changeTaskStatusAC(props.todolistID, props.taskID,!props.completed))}
        />
        <EditableSpan
            currentTitle={props.title}
            handleChangeTitle={handleChangeTaskTitle}
        />
        <IconButton
            aria-label="delete"
            onClick={() => dispatch(removeTaskAC(props.todolistID, props.taskID))}
        >
            <DeleteIcon />
        </IconButton>
    </li>
})