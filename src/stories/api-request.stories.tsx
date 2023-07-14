import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolists-api";
import {TaskPriorityType, tasksAPI, TaskStatusType, TaskType} from "../api/tasks-api";

export default {
    title: 'API'
}

export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsAPI.getTodoLists()
            .then(res => setState(res.data))
            .catch(err => console.log(err.message))
        console.log(state)
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const AddTodoList = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsAPI.addTodoList('new title')
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const RemoveTodoList = () => {
    const [state, setState] = useState<any>(null)
    const todoListID = '62bac475-4816-4d73-962f-7ca5ea9aba89'

    useEffect(() => {
        todolistsAPI.removeTodoList(todoListID)
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodoList = () => {
    const [state, setState] = useState<any>(null)
    const todoListID = '5d5ca738-9290-4ac1-b400-c52263bc8eb8'

    useEffect(() => {
        todolistsAPI.updateTodoList(todoListID, 'ABBABABBAB')
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

/////////////////////////////////////////////////

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)

    const todolistID = 'd9315488-8376-4474-895b-4530cccd1857'

    useEffect(() => {
        tasksAPI.getTasks(todolistID)
            .then(res => setState(res.data))
            .catch(err => console.log(err.message))
        console.log(state)
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const AddTask = () => {
    const [state, setState] = useState<any>(null)

    const todolistID = 'd9315488-8376-4474-895b-4530cccd1857'
    const taskTitle = 'new task title'

    useEffect(() => {
        tasksAPI.addTask(todolistID, taskTitle)
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const RemoveTask = () => {
    const [state, setState] = useState<any>(null)

    const todolistID = 'd9315488-8376-4474-895b-4530cccd1857'
    const taskID = '7ec6dbe3-62c3-4dc5-8c6b-e0821fb3eb2c'

    useEffect(() => {
        tasksAPI.removeTask(todolistID, taskID)
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)

    const todolistID = 'd9315488-8376-4474-895b-4530cccd1857';
    const taskID = '3e1488d2-dda6-40b5-8b0f-47cbd6d18fd6';
    const updatedTaskTitle = 'I CHANGED THIS TITLE';
    const task: TaskType = {
        id: '3', title: 'tea', status: TaskStatusType.Completed,
        description: '',
        order: 0,
        priority: TaskPriorityType.Low,
        startDate: '',
        deadline: '',
        addedDate: '',
        todoListId: 'todolistId2'
    }

    useEffect(() => {
        tasksAPI.updateTaskTitle(todolistID, taskID, task, updatedTaskTitle)
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

