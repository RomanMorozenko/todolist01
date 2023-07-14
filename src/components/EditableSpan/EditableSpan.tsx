import React, {useState} from "react";


export type EditableSpanPropsType = {
    currentTitle: string
    handleChangeTitle:(newTitle:string)=>void
}

const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [title,setTitle] = useState<string>('')

    const handleChangeTitle = () => {
        props.handleChangeTitle(title)
        setEditMode(false)
    }

    return editMode
        ? <input
            autoFocus
            onBlur={() => handleChangeTitle()}
            onKeyDown={e=>e.code === 'Enter' ? handleChangeTitle() : ""}
            value={title}
            onChange={e=>setTitle(e.target.value)}
        />
        : <span
            onDoubleClick={() => {
                setTitle(props.currentTitle)
                setEditMode(true)
            }}
        >
            {props.currentTitle}
         </span>
})

export default EditableSpan;