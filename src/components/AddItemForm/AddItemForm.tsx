import React, {useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type AddItemFormProps = {
    handler: (title:string) => void
}

const AddItemForm = React.memo((props: AddItemFormProps) => {
    // console.log('AddItemForm')

    const [error, setError] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('');

    const ButtonStyles = {
        maxWidth: '38px',
        maxHeight: '38px',
        minWidth: '38px',
        minHeight: '38px',
        backgroundColor:'royalblue',
    }

    const handleAddNewItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (title.trim() === '') {
            setError('Type your task...')
            return
        }
        if (title.trim() !== '') {
            props.handler(title.trim());
            setTitle('');
            setError(null)
        }
    }

    return <>
        <form>
                <TextField
                    id="outlined-basic"
                    label="Type a task"
                    variant="outlined"
                    size='small'
                    value={title}
                    error={!!error}
                    helperText={error}
                    onChange={e => {
                        setError(null);
                        setTitle(e.target.value);
                    }}
                    onKeyDown={e => e.code === 'Enter' && handleAddNewItem(e)}
                />
                <Button
                    style={ButtonStyles}
                    onClick={e => handleAddNewItem(e)}
                    variant="contained"
                >
                    +
                </Button>
        </form>
    </>
})

export default AddItemForm;