import {addTodolistAC, todoListsReducer, TodoListType} from "./todoListsReducer";
import {tasksReducer, TasksStateType} from "./tasksReducer";
import {TaskPriorityType, TaskStatusType} from "../../api/tasks-api";


test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
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
                id: '2', title: 'JS', status: TaskStatusType.Completed,
                description: '',
                order: 0,
                priority: TaskPriorityType.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
                todoListId: 'todolistId1'
            },
            {
                id: '3', title: 'React', status: TaskStatusType.InProgress,
                description: '',
                order: 0,
                priority: TaskPriorityType.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
                todoListId: 'todolistId1'
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatusType.InProgress,
                description: '',
                order: 0,
                priority: TaskPriorityType.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
                todoListId: 'todolistId2'
            },
            {
                id: '2', title: 'milk', status: TaskStatusType.Completed,
                description: '',
                order: 0,
                priority: TaskPriorityType.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
                todoListId: 'todolistId2'
            },
            {
                id: '3', title: 'tea', status: TaskStatusType.Completed,
                description: '',
                order: 0,
                priority: TaskPriorityType.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
                todoListId: 'todolistId2'
            }
        ]
    }

    const action = addTodolistAC('new todolist')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodoListType> = []

    let newTodolist = {
        id: 'new-list-id', title: 'What to code', filter: 'all',addedDate:'',order:0
    }

    const action = addTodolistAC(newTodolist)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todoList.id)
    expect(idFromTodolists).toBe(action.todoList.id)
})