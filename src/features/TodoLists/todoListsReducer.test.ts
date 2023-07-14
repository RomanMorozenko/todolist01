import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterType,
    removeTodolistAC,
    todoListsReducer, TodoListType
} from './todoListsReducer';
import { v1 } from 'uuid';

test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all',addedDate:'',order:0},
        {id: todolistId2, title: 'What to buy', filter: 'all',addedDate:'',order:0}
    ]

    const endState:Array<TodoListType> = todoListsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let todolistId3 = v1()

    let newTodolist = {
        id: todolistId3, title: 'What to code', filter: 'all',addedDate:'',order:0
    }

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all',addedDate:'',order:0},
        {id: todolistId2, title: 'What to buy', filter: 'all',addedDate:'',order:0}
    ]

    const endState = todoListsReducer(startState,addTodolistAC(newTodolist))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolist.title)
})

test('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all',addedDate:'',order:0},
        {id: todolistId2, title: 'What to buy', filter: 'all',addedDate:'',order:0}
    ]

    const endState = todoListsReducer(startState, changeTodolistTitleAC(todolistId2,newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newFilter: FilterType = 'completed'

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all',addedDate:'',order:0},
        {id: todolistId2, title: 'What to buy', filter: 'all',addedDate:'',order:0}
    ]

    const endState = todoListsReducer(startState, changeTodolistFilterAC(todolistId2,newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})