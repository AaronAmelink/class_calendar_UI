import Stack from "@mui/material/Stack";
import {TextField, useTheme} from "@mui/material";
import DocumentManager from "../../managment/documentManager";
import {useState} from "react";

export default function TextStackItem(props) {
    const id = props.id;
    const index = props.index;
    const [text, setText] = useState(DocumentManager.currentPage.content[index].value);
    const theme = useTheme();
    const [focused, setFocused] = useState(false);
    const handleFocusEnter = (e) => {
        moveCaretAtEnd(e)
        setFocused(true);
    }
    const handleFocusExit = () => {
        setFocused(false);
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
            onFocus={handleFocusEnter}
            onBlur={handleFocusExit}
            id={id}
            autoFocus={props.focused}
            onFocus={moveCaretAtEnd}
            multiline
            variant={"standard"}
            InputProps={{disableUnderline: true, style : {color: "#989898"}}}
            sx={{ input: { color: 'text.main' }, width: '100%', textOverflow: 'clip' }}
            onChange={ e=>handleChange(e.target.value)}
            onKeyDown={handleKeyDown}
            value={text}
        />
    );
}
