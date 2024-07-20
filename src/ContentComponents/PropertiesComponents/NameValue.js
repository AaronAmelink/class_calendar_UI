import {TextField} from "@mui/material";
import {useState} from "react";
import DocumentManager from "../../managment/documentManager"
import {setSaved} from "../../slices/pageDataSlice";
import {useDispatch} from "react-redux";

export default function NameValue(props){
    const initialValue = DocumentManager.getProperty(props.id).name;
    const dispatch = useDispatch();
    const [text, setText] = useState(initialValue);

    function handleChange(value) {
        setText(value);
        dispatch(setSaved(false));
        DocumentManager.editPagePropertyName(props.id, value);
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