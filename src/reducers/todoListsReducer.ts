import {FilterType, TodoListType} from "../App";
import {v4} from "uuid";


export type removeTodolistActionType = {
    type:'REMOVE-TODOLIST'
    todolistID:string
};
export type addTodolistActionType = {
    type:'ADD-TODOLIST'
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

export const todoListsReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            const newTodoLists = state.filter(todoList => todoList.id !== action.todolistID)
            return [...newTodoLists]
        case 'ADD-TODOLIST':
            const newListID = v4();
            const todoList: TodoListType = {
                id: newListID,
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



export const removeTodolistAC = () => {
};
export const addTodolistAC = () => {
};
export const changeTodolistTitleAC = () => {
};
export const changeTodolistFilterAC = () => {
};