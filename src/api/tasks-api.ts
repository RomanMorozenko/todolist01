import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
})

export enum TaskStatusType {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorityType {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgently = 3,
    Later = 4

}
export type TaskType = {
    id: string,
    title: string,
    description: string | null,
    todoListId: string,
    order: number,
    status: TaskStatusType,
    priority: TaskPriorityType,
    startDate: string | null,
    deadline: string | null,
    addedDate: string
}
export type ResponseType<D> = {
    data: {item:TaskType},
    messages: [],
    fieldsErrors: [],
    resultCode: number
}

export const tasksAPI = {
    getTasks(todolistID: string) {
        return instance.get<ResponseType<any>>(`${todolistID}/tasks`)
    },
    addTask(todolistID: string, taskTitle: string) {
        return instance.post<ResponseType<any>>(`${todolistID}/tasks`, {title: taskTitle})
    },
    removeTask(todolistID: string, taskID: string) {
        return instance.delete<ResponseType<any>>(`${todolistID}/tasks/${taskID}`)
    },
    updateTaskTitle(todolistID: string, taskID: string,task:TaskType, updatedTaskTitle: string) {
        return instance.put<ResponseType<any>>(`${todolistID}/tasks/${taskID}`, {
            title: updatedTaskTitle,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        })
    },
    updateTaskStatus(todolistID: string, taskID: string, task:TaskType,status:TaskStatusType) {
        return instance.put<ResponseType<any>>(`${todolistID}/tasks/${taskID}`, {
            title: task.title,
            description: task.description,
            status: status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        })
    }
}