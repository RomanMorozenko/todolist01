import React, {useState} from "react";


export type EditableSpanPropsType = {
    currentTitle: string
    handleChangeTitle:(newTitle:string)=>void
}

const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan')
    const [editMode, setEditMode] = useState<boolean>(false);

    return editMode
        ? <input
            autoFocus
            onBlur={() => setEditMode(false)
            }
            onKeyDown={e=>e.code === 'Enter' ? setEditMode(false) : ""}
            value={props.currentTitle}
            onChange={e=>props.handleChangeTitle(e.target.value)}
        />
        : <span
            onDoubleClick={() => setEditMode(true)}
        >
            {props.currentTitle}
         </span>
})

export default EditableSpan;