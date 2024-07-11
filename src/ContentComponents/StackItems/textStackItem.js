import {TextField} from "@mui/material";
import DocumentManager from "../../managment/documentManager";
import {useState} from "react";

export default function TextStackItem(props) {
    const id = props.id;
    const index = props.index;
    const [text, setText] = useState(DocumentManager.currentPage.content[index].value);
    const [focused, setFocused] = useState(DocumentManager.getSelectedContentID() === id);
    const handleFocusEnter = (e) => {
        moveCaretAtEnd(e)
        DocumentManager.selectedContentID = id;
    }



    const handleChange = (newValue) =>{
        setText(newValue);
        DocumentManager.updateContent(id, {
            value : newValue,
            id : id,
            type: "text"
        })
    }

    const moveCaretAtEnd = (e) => {
        var temp_value = e.target.value
        e.target.value = ''
        e.target.value = temp_value
    }


    const handleKeyDown = (e) =>{
        if (text.length === 0 && e.key === "Backspace"){
            props.removeContent(id);
        }
    }

    return(
        <TextField
            id={id.toString()}
            multiline
            variant={"standard"}
            InputProps={{disableUnderline: true, style : {color: "#989898"}}}
            sx={{ input: { color: 'text.main' }, width: '100%', textOverflow: 'clip' }}
            onChange={ e=>handleChange(e.target.value)}
            onKeyDown={handleKeyDown}
            value={text}
            autoFocus={focused}
            onClick={handleFocusEnter}
        />
    );
}
