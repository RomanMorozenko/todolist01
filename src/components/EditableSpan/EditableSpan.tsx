import React, {useState} from "react";


export type EditableSpanPropsType = {
    currentTitle: string
    handleChangeTaskTitle:(newTitle:string)=>void
}

const EditableSpan = (props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false);

    return editMode
        ? <input
            autoFocus
            onBlur={() => setEditMode(false)
            }
            onKeyDown={e=>e.code === 'Enter' ? setEditMode(false) : ""}
            value={props.currentTitle}
            onChange={e=>props.handleChangeTaskTitle(e.target.value)}
        />
        : <span
            onDoubleClick={() => setEditMode(true)}
        >
            {props.currentTitle}
         </span>
}

export default EditableSpan;