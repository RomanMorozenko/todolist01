import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasksReducer'
import {TasksStateType} from './tasksReducer';
import {TaskPriorityType, TaskStatusType} from "../../api/tasks-api";

test('correct task should be deleted from correct array', () => {
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
                id: '2',
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
                id: '3',
                title: 'React',
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
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                status: TaskStatusType.InProgress,
                description: '',
                order: 0,
                priority: TaskPriorityType.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
                todoListId: 'todolistId2'
            },
            {
                id: '2',
                title: 'milk',
                status: TaskStatusType.Completed,
                description: '',
                order: 0,
                priority: TaskPriorityType.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
                todoListId: 'todolistId2'
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatusType.Completed,
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

    const action = removeTaskAC('todolistId2', '2');

    const endState = tasksReducer(startState, action)

    // expect(endState).toEqual({
    //     'todolistId1': [
    //         {id: '1', title: 'CSS', completed: false},
    //         {id: '2', title: 'JS', completed: true},
    //         {id: '3', title: 'React', completed: false}
    //     ],
    //     'todolistId2': [
    //         {id: '1', title: 'bread', completed: false},
    //         {id: '3', title: 'tea', completed: false}
    //     ]
    // })
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
})

test('correct task should be added to correct array', () => {
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

    const action = addTaskAC('todolistId2', {
        id: 'random-id',
        title: 'TESTING-TASK',
        status: TaskStatusType.New,
        description: '',
        order: 0,
        priority: TaskPriorityType.Low,
        startDate: '',
        deadline: '',
        addedDate: '',
        todoListId: 'todolistId1'
    })

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][endState['todolistId2'].length - 1].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('TESTING-TASK')
    // expect(endState['todolistId2'][endState['todolistId2'].length - 1].status).toBe(TaskStatusType.InProgress)
})

test('status of specified task should be changed', () => {
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
                id: '2',
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
                id: '3', title: 'React',
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
        'todolistId2': [
            {
                id: '1', title: 'bread',
                status: TaskStatusType.InProgress,
                description: '',
                order: 0,
                priority: TaskPriorityType.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
                todoListId: 'todolistId2'
            },
            {
                id: '2', title: 'milk',
                status: TaskStatusType.Completed,
                description: '',
                order: 0,
                priority: TaskPriorityType.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
                todoListId: 'todolistId2'
            },
            {
                id: '3', title: 'tea',
                status: TaskStatusType.Completed,
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

    const action = changeTaskStatusAC('todolistId2', '2', 1)

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'].find(task => task.id === '2')?.status).toBe(TaskStatusType.InProgress);
    expect(endState['todolistId1'].find(task => task.id === '2')?.status).toBe(TaskStatusType.Completed)
})

test('title of specified task should be changed', () => {

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

    const action = changeTaskTitleAC('todolistId2', '2', 'walk the dog')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'].find(task => task.id === '2')?.title).toBe('walk the dog');
    expect(endState['todolistId1'].find(task => task.id === '2')?.title).toBe('JS')
})