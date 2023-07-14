import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import {action} from '@storybook/addon-actions';
import {expect} from '@storybook/jest'

import AddItemForm from "../components/AddItemForm/AddItemForm";


const meta: Meta<typeof AddItemForm> = {
    title:'TODOLIST-APP/AddItemForm',
    component:AddItemForm,
    tags: ['autodocs'],
    argTypes: {
        handler: {
            description: 'Button clicked',
            action: 'clicked'
        }
    },
}

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const Default: Story = {
    args:{
        handler:action('Button clicked')
    }
}

export const Filled: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const formInput = canvas.getByLabelText('Type a task', {
            selector: 'input',
        });

        await userEvent.type(formInput,'Task example', {
            delay: 100,
        });

        const submitButton = canvas.getByRole('button');

        await userEvent.click(submitButton);
    },
};

export const Error: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const formInput = canvas.getByLabelText('Type a task', {
            selector: 'input',
        });

        await userEvent.type(formInput, ' ', {
            delay: 100,
        });

        const submitButton = canvas.getByRole('button');

        await userEvent.click(submitButton);
    },
};