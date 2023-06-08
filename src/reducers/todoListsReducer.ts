import {FilterType, TodoListType} from "../App";
import {v4} from "uuid";


export type removeTodolistActionType = {
    type:'REMOVE-TODOLIST'
    todolistID:string
};
export type addTodolistActionType = {
    type:'ADD-TODOLIST'
    todolistID:string
    todoListTitle:string
};
export type changeTodolistTitleActionType = {
    type:'CHANGE-TODOLIST-TITLE'
    todoListID:string
    newTitle:string
};
export type changeTodolistFilterActionType = {
    type:'CHANGE-TODOLIST-FILTER'
    todoListID:string
    filter:FilterType
};

type ActionType =
    removeTodolistActionType
    |addTodolistActionType
    |changeTodolistTitleActionType
    |changeTodolistFilterActionType;

const initialState:Array<TodoListType> = []

export const todoListsReducer = (state: Array<TodoListType> = initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            const newTodoLists = state.filter(todoList => todoList.id !== action.todolistID)
            return [...newTodoLists]
        case 'ADD-TODOLIST':
            const todoList: TodoListType = {
                id: action.todolistID,
                title: action.todoListTitle,
                filter: 'all'
            }
            return [...state, {...todoList}]
        case 'CHANGE-TODOLIST-TITLE':
            const targetedList = state.find(list => list.id === action.todoListID);
            targetedList && (targetedList.title = action.newTitle);
            return [...state]
        case 'CHANGE-TODOLIST-FILTER':
            const currentList = state.find(list => list.id === action.todoListID);
            currentList && (currentList.filter = action.filter)
            return [...state]
        default:
            return state
    }
}



export const removeTodolistAC = (todolistID:string):removeTodolistActionType => {
    return {type:'REMOVE-TODOLIST',todolistID}
};
export const addTodolistAC = (todoListTitle:string):addTodolistActionType => {
    let todolistID = v4();
    return {type:'ADD-TODOLIST',todolistID,todoListTitle}
};
export const changeTodolistTitleAC = (todoListID:string,newTitle:string):changeTodolistTitleActionType => {
    return {type:'CHANGE-TODOLIST-TITLE',todoListID,newTitle}
};
export const changeTodolistFilterAC = (todoListID:string,filter:FilterType):changeTodolistFilterActionType => {
    return {type:'CHANGE-TODOLIST-FILTER',todoListID,filter}
};