import {addTodolistActionType, removeTodolistActionType, setTodolistsActionType} from "./todoListsReducer";
import {tasksAPI, TaskStatusType, TaskType} from "../../api/tasks-api";
import {ThunkType} from "../../app/store";

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state,[action.todolistID]:state[action.todolistID].filter(task => task.id !== action.taskID)}
        case 'ADD-TASK':
            const newTask: TaskType = {
                id: action.task.id,
                title: action.task.title,
                status: TaskStatusType.New,
                description: action.task.description,
                order: action.task.order,
                priority: action.task.priority,
                startDate: action.task.startDate,
                deadline: action.task.deadline,
                addedDate: action.task.addedDate,
                todoListId: action.task.todoListId
            }
            return {...state,[action.todolistID]:[newTask,...state[action.todolistID]]}
        case 'CHANGE-TASK-TITLE':
            return {...state,[action.todoListID]:state[action.todoListID].map(t=>t.id === action.taskID?{...t,title:action.newTitle}:t)}
        case 'CHANGE-TASK-STATUS':
            return {...state,[action.todoListID]:state[action.todoListID].map(t=>t.id === action.taskID?{...t,status:action.status}:t)}
        case 'REMOVE-TODOLIST':
            const stateCopy = {...state};
            delete stateCopy[action.todolistID];
            return stateCopy;
        case 'ADD-TODOLIST':
            return {...state,[action.todoList.id]:[]}
        case 'SET-TODOLISTS': {
            const stateCopy = {...state};
            action.todolists.forEach(todolist => {
                stateCopy[todolist.id] = []
            })
            return stateCopy;
        }
        case 'SET-TASKS':
            return {...state,[action.todolistId]:action.tasks}
        default:
            return state
    }
};

// actions

export const removeTaskAC = (todolistID: string, taskID: string) => ({type: 'REMOVE-TASK', todolistID, taskID} as const)
export const addTaskAC = (todolistID: string, task:TaskType) => ({type: 'ADD-TASK', todolistID, task} as const)
export const changeTaskTitleAC = (todoListID: string, taskID: string, newTitle: string) => ({type: 'CHANGE-TASK-TITLE', todoListID, taskID, newTitle} as const)
export const changeTaskStatusAC = (todoListID: string, taskID: string, status: TaskStatusType) => ({type: 'CHANGE-TASK-STATUS', todoListID, taskID, status} as const)
export const setTasksAC = (todolistId:string,tasks:Array<TaskType>) => ({type:'SET-TASKS',tasks,todolistId} as const)

// thunks

export const fetchTasksTC = (todolistId:string):ThunkType => {
    return (dispatch) => {
        tasksAPI.getTasks(todolistId)
            .then((res:any)=> {
                const tasks = res.data.items
                dispatch(setTasksAC(todolistId,tasks))
            })
    }
}
export const removeTaskTC = (todolistID: string, taskID: string):ThunkType  => {
    return (dispatch)=>{
        tasksAPI.removeTask(todolistID,taskID)
            .then(res=>dispatch(removeTaskAC(todolistID,taskID)))
    }
}
export const addTaskTC = (todolistID: string, taskTitle: string):ThunkType  => {
    return (dispatch)=>{
        tasksAPI.addTask(todolistID,taskTitle)
            .then(res=>dispatch(addTaskAC(todolistID,res.data.data.item)))
    }
}
export const changeTaskStatusTC = (todoListID: string, taskID: string, status: TaskStatusType):ThunkType => {
    return (dispatch,getState)=>{
        let state = getState();
        let task = state.tasks[todoListID].find(task=>task.id===taskID)
        if (!task) return
        tasksAPI.updateTaskStatus(todoListID,taskID,task,status)
            .then(res=>dispatch(changeTaskStatusAC(todoListID,taskID,status)))
    }
}
export const changeTaskTitleTC = (todoListID: string, taskID: string, newTitle:string):ThunkType => {
    return (dispatch,getState)=>{
        let state = getState();
        let task = state.tasks[todoListID].find(task=>task.id===taskID)
        if (!task) return
        tasksAPI.updateTaskTitle(todoListID,taskID,task,newTitle)
            .then(res=>dispatch(changeTaskTitleAC(todoListID,taskID,newTitle)))
    }
}

// types

export type TasksStateType = {
    [id: string]: Array<TaskType>
};
const initialState: TasksStateType = {};
export type TasksActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof setTasksAC>
    | removeTodolistActionType
    | addTodolistActionType
    | setTodolistsActionType;