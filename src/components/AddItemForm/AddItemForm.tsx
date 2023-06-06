import styles from './addItemForm.module.css';
import React, {useState} from "react";

type AddItemFormProps = {
    handler: (title:string) => void
}

const AddItemForm = (props: AddItemFormProps) => {

    const [error, setError] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('');

    const handleAddNewItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement>) => {
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
            <input
                type='text'
                value={title}
                onChange={e => {
                    setError(null);
                    setTitle(e.target.value);
                }}
                onKeyDown={e => e.code === 'Enter' && handleAddNewItem(e)}
                className={error ? styles.error : ''}
            />
            <button
                onClick={e => handleAddNewItem(e)}
            >+
            </button>
        </form>
        {error ? <h4 className={styles.errorText}>{error}</h4> : <></>}
    </>
}

export default AddItemForm;