import {Grid, TextField} from "@mui/material";
import {useMemo, useState} from "react";
import Checkbox from '@mui/material/Checkbox';
import {makeContentSelector} from "../../../slices/pageDataSlice";
import {useSelector} from "react-redux";
import usePageData from "../../../customHooks/pageDataHook";
import {useParams} from "react-router-dom";

const {v4: uuidv4} = require('uuid');
export default function CheckboxStackItem({id, index}) {
    const contentSelector = useMemo(makeContentSelector, [])
    const [shiftDown, setShiftDown] = useState(false);
    const content = useSelector(state =>
        contentSelector(state, id)
    )
    const params = useParams();
    const {addContent, updateContent, removeContent} = usePageData();

    if (!content) return (<div></div>);

    const handleTextChange = (newValue) => {
        updateContent(
            {
                value: newValue,
                checked: content.checked,
                id: id,
                type: "checkbox",
                indent: content.indent
            }, params.pageID, id);
    }

    const handleCheckChange = (event) => {
        updateContent(
            {
                value: content.value,
                checked: event.target.checked,
                id: id,
                type: "checkbox",
                indent: content.indent
            }, params.pageID, id);
    };

    const handleKeyUp = (e) => {
        if (e.key === "Shift") setShiftDown(false);
    }
    const handleKeyDown = (e) => {

        if (e.keyCode === 9) e.preventDefault();

        if (content.value.length === 0 && e.key === "Backspace") {
            removeContent(id);
        }

        if (e.key === "Shift") setShiftDown(true);

        if (e.key === "Enter") {
            addContent(index, {
                value: '',
                id: uuidv4(),
                type: "checkbox",
                checked: content.checked,
                indent: content.indent
            }, params.pageID, id);
        }

        if (e.key === "Tab" && content.indent <= 6 && content.indent >= 0) {
            if ((shiftDown && content.indent > 0) || content.indent === 6) {
                updateContent(
                    {
                        value: content.value,
                        checked: content.checked,
                        id: id,
                        type: "checkbox",
                        indent: content.indent - 1
                    }, params.pageID, id);
            } else {
                updateContent(
                    {
                        value: content.value,
                        checked: content.checked,
                        id: id,
                        type: "checkbox",
                        indent: content.indent + 1
                    }, params.pageID, id);
            }
        }
    }

    const handleClick = () => {
    }

    return (
        <Grid container spacing={0} wrap='nowrap'>
            <Grid item xs="0.3" sx={{ml: 10 * (content?.indent), mr: 1}}>
                <Checkbox
                    onKeyDown={handleKeyDown}
                    checked={content?.checked}
                    onChange={handleCheckChange}
                    sx={{
                        color: 'text.main',
                        '&.Mui-checked': {
                            color: 'text.main',
                        },
                    }}
                />
            </Grid>
            <Grid item sx={{mt: 0.5, ml: 1}} xs="11">
                <TextField
                    id={id}
                    variant={"standard"}
                    InputProps={{disableUnderline: true}}
                    sx={{width: '100%', textOverflow: 'clip'}}
                    onChange={e => handleTextChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}
                    onClick={handleClick}

                    value={content?.value}
                />
            </Grid>
        </Grid>
    );
}
