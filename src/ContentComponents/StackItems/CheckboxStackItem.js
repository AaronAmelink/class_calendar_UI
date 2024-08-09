import {Grid, TextField} from "@mui/material";
import DocumentManager from "../../managment/documentManager";
import {useEffect, useMemo, useRef, useState} from "react";
import Checkbox from '@mui/material/Checkbox';
import {makeContentSelector, setSaved} from "../../slices/pageDataSlice";
import {useDispatch, useSelector} from "react-redux";
import usePageData from "../../customHooks/pageDataHook";
import {useParams} from "react-router-dom";
const { v4: uuidv4 } = require('uuid');
export default function CheckboxStackItem(props) {
    const id = props.id;
    const index = props.index
    const contentSelector = useMemo(makeContentSelector, [])

    const content = useSelector(state =>
        contentSelector(state, id)
    )
    const [text, setText] = useState(content.value);
    const [checked, setChecked] = useState(content.checked);
    const [indent, setIndent] = useState(content.indent);
    const [shiftDown, setShiftDown] = useState(false);
    const [autoFocus, setAutoFocus] = useState(false);
    const params = useParams();
    const {  addContent, updateContent } = usePageData();

    const handleTextChange = (newValue) =>{
        setText(newValue);
        updateContent(
            {
                value : newValue,
                checked: checked,
                id : id,
                type: "checkbox",
                indent: indent
            }, props.page_id);
    }

    const handleCheckChange = (event) => {
        setChecked(event.target.checked);
        updateContent(
            {
                value : text,
                checked: event.target.checked,
                id : id,
                type: "checkbox",
                indent: indent
            }, props.page_id);
    };

    const handleKeyUp = (e) => {
        if (e.key === "Shift") setShiftDown(false);
    }
    const handleKeyDown = (e) =>{

        if (e.keyCode === 9) e.preventDefault();

        if (text.length === 0 && e.key === "Backspace"){
            props.removeContent(id);
        }

        if (e.key === "Shift") setShiftDown(true);

        if (e.key === "Enter"){
            addContent(index,{
                value : '',
                id : uuidv4(),
                type: "checkbox",
                checked : checked,
                indent : indent
            }, params);
        }

        if (e.key === "Tab" && indent < 6 && indent >= 0){
            if (shiftDown && indent > 0){
                setIndent(indent-1);
                updateContent(
                    {
                        value : text,
                        checked: checked,
                        id : id,
                        type: "checkbox",
                        indent: indent-1
                    }, props.page_id);
            }
            else{
                setIndent(indent+1);
                updateContent(
                    {
                        value : text,
                        checked: checked,
                        id : id,
                        type: "checkbox",
                        indent: indent+1
                    }, props.page_id);
            }
        }
    }

    const handleClick = () => {
    }

    return(
        <Grid container spacing={0} wrap='nowrap'>
            <Grid item xs="0.3" sx={{ml:10*(indent), mr:1}}>
                <Checkbox
                    onKeyDown={handleKeyDown}
                    checked={checked}
                    onChange={handleCheckChange}
                    sx={{
                        color: 'text.main',
                        '&.Mui-checked': {
                            color: 'text.main',
                        },
                    }}
                />
            </Grid>
            <Grid item sx={{mt: 0.5, ml:1}} xs="11">
                <TextField
                    autoFocus={autoFocus}
                    id={id}
                    variant={"standard"}
                    InputProps={{disableUnderline: true}}
                    sx={{ width: '100%', textOverflow: 'clip' }}
                    onChange={ e=>handleTextChange(e.target.value)}

                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}
                    onClick={handleClick}

                    value={text}
                />
            </Grid>
        </Grid>
    );
}
