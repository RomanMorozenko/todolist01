import {useDispatch} from "react-redux";
import {
    changeTaskStatusAC,
    changeTaskStatusTC,
    changeTaskTitleAC, changeTaskTitleTC,
    removeTaskAC,
    removeTaskTC
} from "../../tasksReducer";
import Checkbox from "@mui/material/Checkbox";
import EditableSpan from "../../../../components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {useCallback} from "react";
import {useAppDispatch} from "../../../../app/store";


type TaskPropsType = {
    todolistID:string
    taskID:string
    completed:boolean
    title:string
}

export const Task = React.memo((props:TaskPropsType) => {
    const dispatch = useAppDispatch();

    const handleChangeTaskTitle = useCallback((newTitle:string) => {
        dispatch(changeTaskTitleTC(props.todolistID,props.taskID,newTitle));
    },[dispatch,props.todolistID,props.taskID])

    const status = props.completed?1:2

    return <li
    >
        <Checkbox
            checked={props.completed}
            onChange={() => dispatch(changeTaskStatusTC(props.todolistID,props.taskID,status))}
        />
        <EditableSpan
            currentTitle={props.title}
            handleChangeTitle={handleChangeTaskTitle}
        />
        <IconButton
            aria-label="delete"
            onClick={() => dispatch(removeTaskTC(props.todolistID, props.taskID))}
        >
            <DeleteIcon />
        </IconButton>
    </li>
})