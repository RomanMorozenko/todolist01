import {tasksReducer} from '../features/TodoLists/tasksReducer';
import {todoListsReducer} from '../features/TodoLists/todoListsReducer';
import {combineReducers, createStore} from 'redux';
import {Provider} from "react-redux";
import {v4} from "uuid";
import {TaskPriorityType, TaskStatusType} from "../api/tasks-api";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer
})

const InitState = {
    todoLists: [
        {id: 'todolistID1', title: 'what to buy', filter: 'all', addedDate: '', order: 0},
        {id: 'todolistID2', title: 'what to do', filter: 'all', addedDate: '', order: 0},
    ],
    tasks: {
        ['todolistID1']: [
            {
                id: v4(),
                title: 'JS',
                status: TaskStatusType.Completed,
                description: '',
                order: 0,
                priority: TaskPriorityType.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
                todoListId: 'todolistId1'
            },
            {
                id: v4(),
                title: 'CSS',
                status: TaskStatusType.InProgress,
                description: '',
                order: 0,
                priority: TaskPriorityType.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
                todoListId: 'todolistId1'
            }
        ],
        ['todolistID2']: [
            {
                id: v4(),
                title: 'Run',
                status: TaskStatusType.InProgress,
                description: '',
                order: 0,
                priority: TaskPriorityType.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
                todoListId: 'todolistId1'
            },
            {
                id: v4(),
                title: 'Jump',
                status: TaskStatusType.Completed,
                description: '',
                order: 0,
                priority: TaskPriorityType.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
                todoListId: 'todolistId1'
            }
        ],
    }
}

export const StoryBookStore = createStore(rootReducer, InitState)

export const ContextProviderDecorator = (story: any) => {
    return <Provider store={StoryBookStore}>
        {story()}
    </Provider>
}