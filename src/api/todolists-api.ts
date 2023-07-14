import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
})

export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {
        item: D
    }
}

export const todolistsAPI = {
    getTodoLists() {
        return instance.get<TodoListType[]>("todo-lists")
    },
    addTodoList(title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>("todo-lists", {title})
    },
    removeTodoList(id: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${id}`)
    },
    updateTodoList(id: string, newTitle: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${id}`, {newTitle})
    }
}