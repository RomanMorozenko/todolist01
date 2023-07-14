import {TasksActionType, tasksReducer} from '../features/TodoLists/tasksReducer';
import {TodoActionType, todoListsReducer} from '../features/TodoLists/todoListsReducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer
})

export const store = createStore(rootReducer,applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, RootActions>
export type RootActions =  TasksActionType | TodoActionType
export type ThunkType<ReturnType = void> = ThunkAction<void, AppRootStateType, unknown, RootActions>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store