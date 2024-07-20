import {TextField} from "@mui/material";
import DocumentManager from "../../managment/documentManager";
import {useState} from "react";
import {setSaved} from "../../slices/pageDataSlice";
import {useDispatch, useSelector} from "react-redux";
import allThemes from "../../theme";
export default function TextStackItem(props) {
    const siteTheme = useSelector((state) => state.siteData.theme);
    const id = props.id;
    const index = props.index;
    const dispatch = useDispatch();
    const [text, setText] = useState(DocumentManager.currentPage.content[index].value);
    const handleFocusEnter = (e) => {
        moveCaretAtEnd(e)
    }



    const handleChange = (newValue) =>{
        setText(newValue);
        DocumentManager.updateContent(id, {
            value : newValue,
            id : id,
            type: "text"
        });
        dispatch(setSaved(false));
    }

    const moveCaretAtEnd = (e) => {
        let temp_value = e.target.value
        e.target.value = ''
        e.target.value = temp_value
    }


    const handleKeyDown = (e) =>{
        if (text.length === 0 && e.key === "Backspace"){
            props.removeContent(id);
            dispatch(setSaved(false));
        }
    }

    return(
        <TextField
            id={id.toString()}
            multiline
            variant={"standard"}
            InputProps={{disableUnderline: true, style:{color: allThemes[siteTheme].palette.text.secondary}}}
            sx={{ width: '100%', textOverflow: 'clip' }}
            onChange={ e=>handleChange(e.target.value)}
            onKeyDown={handleKeyDown}
            value={text}
            onClick={handleFocusEnter}
        />
    );
}
