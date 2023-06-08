import {TasksStateType, TaskType} from "../App";
import {v4} from "uuid";
import {addTodolistActionType, removeTodolistActionType} from "./todoListsReducer";


export type removeTaskActionType = {
    type: 'REMOVE-TASK'
    todolistID: string
    taskID: string
};
export type addTaskActionType = {
    type: 'ADD-TASK'
    todolistID: string
    taskTitle: string
};
export type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todoListID: string
    taskID: string
    newTitle: string
};
export type changeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todoListID: string
    taskID: string
    value:boolean
};
export type ActionType =
    removeTaskActionType
    | addTaskActionType
    | changeTaskTitleActionType
    | changeTaskStatusActionType
    | removeTodolistActionType
    | addTodolistActionType;


const initialState:TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            stateCopy[action.todolistID] = stateCopy[action.todolistID].filter(task => task.id !== action.taskID);
            return stateCopy
        }
        case 'ADD-TASK': {
            const newTask: TaskType = {
                id: v4(),
                title: action.taskTitle,
                completed: false
            }
            return ({...state, [action.todolistID]: [...state[action.todolistID], newTask]})
        }
        case 'CHANGE-TASK-TITLE': {
            let task = state[action.todoListID].find(task => task.id === action.taskID);
            task && (task.title = action.newTitle);
            return ({...state, [action.todoListID]: [...state[action.todoListID]]});
        }
        case 'CHANGE-TASK-STATUS': {
            let task = state[action.todoListID].find(task => task.id === action.taskID);
            task && (task.completed = !task.completed);
            return ({...state, [action.todoListID]: [...state[action.todoListID]]});
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.todolistID];
            return stateCopy;
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};
            stateCopy[action.todolistID] = [];
            return stateCopy;
        }
        default:
            return state
    }
}

export const removeTaskAC = (todolistID: string, taskID: string): removeTaskActionType => {
    return {type: 'REMOVE-TASK', todolistID, taskID}
};
export const addTaskAC = (todolistID: string, taskTitle: string): addTaskActionType => {
    return {type: 'ADD-TASK', todolistID, taskTitle}
};
export const changeTaskTitleAC = (todoListID: string, taskID: string, newTitle: string): changeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', todoListID, taskID, newTitle}
};
export const changeTaskStatusAC = (todoListID: string, taskID: string,value:boolean): changeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', todoListID, taskID, value}
};