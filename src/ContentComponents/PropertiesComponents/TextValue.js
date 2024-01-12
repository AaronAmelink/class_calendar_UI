import {TextFields} from "@mui/icons-material";
import {TextField} from "@mui/material";
import {useState} from "react";
import DocumentManager from "../../managment/documentManager"

export default function TextValue(props){
    const initialValue = DocumentManager.getProperty(props.id).value;
    const [text, setText] = useState(initialValue);

    function handleChange(value) {
        setText(value);
        DocumentManager.editPagePropertyValue(props.id, value);
    }

    return (
        <TextField
            variant={"outlined"}
            InputProps={{disableUnderline: true, style : {color: "#989898"}}}
            sx={{ input: { color: 'text.main' }, textOverflow: 'clip' }}
            onChange={ e=>handleChange(e.target.value)}
            value={text}
        />
    )
}