import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import {action} from '@storybook/addon-actions';
import {expect} from '@storybook/jest'

import EditableSpan from "../components/EditableSpan/EditableSpan";

const meta:Meta<typeof EditableSpan> = {
    title:'TODOLIST-APP/EditableSpan',
    component:EditableSpan,
    tags: ['autodocs'],
    argTypes: {
        // how does this works?
        // currentTitle:{
        //     defaultValue:'Task title'
        // },
        // handleChangeTitle: {
        //     description: 'Button clicked',
        //     action: 'clicked'
        // }
    },
}

export default meta;
const handleChangeTitle = () => action('The title was changed')


type Story = StoryObj<typeof EditableSpan>;

export const SpanMode: Story = {
    args:{
        currentTitle:'Example task title',
        handleChangeTitle:handleChangeTitle
    }
}

export const ChangingToInputMode: Story = {
    args:{
        currentTitle:'Example task title',
        handleChangeTitle:handleChangeTitle
    },
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement);
        const targetedSpan = canvas.getByRole('generic');
        await expect(targetedSpan).toBeInTheDocument();
        await userEvent.dblClick(targetedSpan);
    }
}