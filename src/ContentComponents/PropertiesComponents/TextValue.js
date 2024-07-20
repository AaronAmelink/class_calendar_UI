import {TextField} from "@mui/material";
import {useState} from "react";
import DocumentManager from "../../managment/documentManager"
import {setSaved} from "../../slices/pageDataSlice";
import {useDispatch} from "react-redux";

export default function TextValue(props){
    const initialValue = DocumentManager.getProperty(props.id).value;
    const dispatch = useDispatch();
    const [text, setText] = useState(initialValue);

    function handleChange(value) {
        setText(value);
        DocumentManager.editPagePropertyValue(props.id, value);
        dispatch(setSaved(false));
    }

    return (
        <TextField
            variant={"outlined"}
            InputProps={{disableunderline: "true", style : {color: "#989898"}}}
            sx={{ input: { color: 'text.main' }, textOverflow: 'clip' }}
            onChange={ e=>handleChange(e.target.value)}
            value={text}
        />
    )
}