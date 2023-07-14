import {v4} from "uuid";
import {todolistsAPI, TodoListType as TodoListTypeAPI} from "../../api/todolists-api";
import {ThunkType} from "../../app/store";

export const todoListsReducer = (state: Array<TodoListType> = initialState, action: TodoActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(todoList => todoList.id !== action.todolistID)
        case 'ADD-TODOLIST':
            const todoList: TodoListType = {
                id: action.todoList.id,
                title: action.todoList.title,
                filter: action.todoList.filter,
                addedDate: action.todoList.addedDate,
                order: action.todoList.order
            }
            return [...state, {...todoList}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl=> tl.id===action.todoListID ? {...tl,title:action.newTitle}: tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl=> tl.id===action.todoListID ? {...tl,filter:action.filter}: tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(todolist=>({...todolist,filter:'all'}))
        default:
            return state
    }
}

// actions

export const removeTodolistAC = (todolistID: string) => ({type: 'REMOVE-TODOLIST', todolistID} as const);
export const addTodolistAC = (todoList:any) => ({type: 'ADD-TODOLIST', todoList } as const);
export const changeTodolistTitleAC = (todoListID: string, newTitle: string) => ({type: 'CHANGE-TODOLIST-TITLE', todoListID, newTitle} as const);
export const changeTodolistFilterAC = (todoListID: string, filter: FilterType) => ({type: 'CHANGE-TODOLIST-FILTER', todoListID, filter} as const);
export const setTodolistsAC = (todolists: Array<TodoListTypeAPI>) => ({type:'SET-TODOLISTS',todolists} as const);

// thunks

export const fetchTodolistsTC = (): ThunkType => {
    return (dispatch) => {
        todolistsAPI.getTodoLists()
            .then(res=>{
                dispatch(setTodolistsAC(res.data))
            })
    }
}
export const removeTodolistTC = (todolistID:string): ThunkType => {
    return (dispatch) => {
        todolistsAPI.removeTodoList(todolistID)
            .then(res=>{
                dispatch(removeTodolistAC(todolistID))
            })
    }
}
export const addTodolistTC = (todolistTitle:string): ThunkType => {
    return (dispatch) => {
        todolistsAPI.addTodoList(todolistTitle)
            .then(res=>{
                let todolist = {...res.data.data.item,filter:'all'}
                dispatch(addTodolistAC(todolist))
            })
            .catch(err=>console.log(err.response.data))
    }
}
export const changeTodolistTitleTC = (todoListID: string, newTitle: string): ThunkType => {
    return (dispatch) => {
        todolistsAPI.updateTodoList(todoListID,newTitle)
            .then(res=>{
                console.log(res)
                dispatch(changeTodolistTitleAC(todoListID,newTitle))
            })
    }
}

// types

export type FilterType = 'all' | 'active' | 'completed';
export type TodoListType = TodoListTypeAPI & {
    filter: FilterType
}
export type removeTodolistActionType = ReturnType<typeof removeTodolistAC>
export type addTodolistActionType = ReturnType<typeof addTodolistAC>
export type changeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type changeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type setTodolistsActionType = ReturnType<typeof setTodolistsAC>

export type TodoActionType =
    | removeTodolistActionType
    | addTodolistActionType
    | changeTodolistTitleActionType
    | changeTodolistFilterActionType
    | setTodolistsActionType;

const initialState: Array<TodoListType> = []

