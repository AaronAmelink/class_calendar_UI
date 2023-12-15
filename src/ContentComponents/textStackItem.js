import Stack from "@mui/material/Stack";
import {TextField, useTheme} from "@mui/material";
import DocumentManager from "../managment/documentManager";
import {useState} from "react";

export default function TextStackItem(props) {
    const id = props.id;
    const index = DocumentManager.getContentIndex(id);
    const initialValue = (index != null) ? DocumentManager.currentPage.content[index].value : "";
    const [text, setText] = useState(initialValue);
    const theme = useTheme();


    const handleChange = (newValue) =>{
        setText(newValue);
        DocumentManager.updateContent(id, {
            value : newValue,
            id : id,
            type: "text"
        })
    }


    const handleKeyDown = (e) =>{
        if (text.length === 0 && e.key === "Backspace"){
            DocumentManager.removeContent(id);
            props.setRender(false);
        }
    }

    return(
        <TextField
            id={id}
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
