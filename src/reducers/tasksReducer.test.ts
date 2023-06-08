import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasksReducer'
import { TasksStateType } from '../App'

test('correct task should be deleted from correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', completed: false},
            {id: '2', title: 'JS', completed: true},
            {id: '3', title: 'React', completed: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', completed: false},
            {id: '2', title: 'milk', completed: true},
            {id: '3', title: 'tea', completed: false}
        ]
    }

    const action = removeTaskAC('todolistId2','2');

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', completed: false},
            {id: '2', title: 'JS', completed: true},
            {id: '3', title: 'React', completed: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', completed: false},
            {id: '3', title: 'tea', completed: false}
        ]
    })
})

test('correct task should be added to correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', completed: false},
            {id: '2', title: 'JS', completed: true},
            {id: '3', title: 'React', completed: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', completed: false},
            {id: '2', title: 'milk', completed: true},
            {id: '3', title: 'tea', completed: false}
        ]
    }

    const action = addTaskAC( 'todolistId2','juice')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][endState['todolistId2'].length-1].id).toBeDefined()
    expect(endState['todolistId2'][endState['todolistId2'].length-1].title).toBe('juice')
    expect(endState['todolistId2'][endState['todolistId2'].length-1].completed).toBe(false)
})

test('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', completed: false},
            {id: '2', title: 'JS', completed: true},
            {id: '3', title: 'React', completed: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', completed: false},
            {id: '2', title: 'milk', completed: true},
            {id: '3', title: 'tea', completed: false}
        ]
    }

    const action = changeTaskStatusAC('todolistId2','2',false)

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'].find(task=>task.id==='2')?.completed).toBe(false);
    expect(endState['todolistId1'].find(task=>task.id==='2')?.completed).toBe(true)
})

test('title of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', completed: false},
            {id: '2', title: 'JS', completed: true},
            {id: '3', title: 'React', completed: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', completed: false},
            {id: '2', title: 'milk', completed: true},
            {id: '3', title: 'tea', completed: false}
        ]
    }

    const action = changeTaskTitleAC('todolistId2','2','walk the dog')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'].find(task=>task.id==='2')?.title).toBe('walk the dog');
    expect(endState['todolistId1'].find(task=>task.id==='2')?.title).toBe('JS')
})