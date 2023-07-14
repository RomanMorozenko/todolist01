import type { Meta, StoryObj } from '@storybook/react';


import {Task} from '../features/TodoLists/TodoList/Task/Task';
import {ContextProviderDecorator} from "./ContextProviderDecorator";


const meta:Meta<typeof Task> = {
    title:'TODOLIST-APP/Task',
    component:Task,
    tags: ['autodocs'],
    // decorators:[ContextProviderDecorator]
    // argTypes: {
    //     // how does this works?
    //     // currentTitle:{
    //     //     defaultValue:'Task title'
    //     // },
    //     // handleChangeTitle: {
    //     //     description: 'Button clicked',
    //     //     action: 'clicked'
    //     // }
    // },
}

export default meta;

type Story = StoryObj<typeof Task>

export const Default:Story = {
    args:{
        todolistID:'todolistID1',
        taskID:'taskID1',
        completed:true,
        title:'test task',
    }
}