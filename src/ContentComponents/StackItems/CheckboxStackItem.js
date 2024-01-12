import {Grid, TextField, useTheme} from "@mui/material";
import DocumentManager from "../../managment/documentManager";
import {useState} from "react";
import Checkbox from '@mui/material/Checkbox';
export default function CheckboxStackItem(props) {
    const id = props.id;
    const index = props.index;
    const [text, setText] = useState(DocumentManager.currentPage.content[index].value);
    const [checked, setChecked] = useState(DocumentManager.currentPage.content[index].checked);
    const [indent, setIndent] = useState(DocumentManager.currentPage.content[index].indent)
    const [shiftDown, setShiftDown] = useState(false);


    const handleTextChange = (newValue) =>{
        setText(newValue);
        DocumentManager.updateContent(id, {
            value : newValue,
            id : id,
            type: "checkbox",
            checked : checked,
            indent : indent
        })
    }

    const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setChecked(event.target.checked);

        DocumentManager.updateContent(id, {
            value : text,
            id :id,
            type: "checkbox",
            checked : event.target.checked,
            indent : indent
        });

        console.log(DocumentManager.currentPage.content[index]);
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

        if (e.key === "Tab" && DocumentManager.currentPage.content[index].indent < 6 && DocumentManager.currentPage.content[index].indent >= 0){
            if (shiftDown && DocumentManager.currentPage.content[index].indent > 0){
                setIndent(indent-1);
                DocumentManager.updateContent(id, {
                    value : text,
                    id :id,
                    type: "checkbox",
                    checked : checked,
                    indent : indent-1
                });
            }
            else{
                setIndent(indent+1);
                DocumentManager.updateContent(id, {
                    value : text,
                    id :id,
                    type: "checkbox",
                    checked : checked,
                    indent : indent+1
                });
            }
        }
    }

    return(
        <Grid container spacing={0} wrap='nowrap'>
            <Grid item xs="0.3" sx={{ml:10*(indent)}}>
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
                    id={id}
                    variant={"standard"}
                    InputProps={{disableUnderline: true, style : {color: "#989898"}}}
                    sx={{ input: { color: 'text.main' }, width: '100%', textOverflow: 'clip' }}
                    onChange={ e=>handleTextChange(e.target.value)}

                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}

                    value={text}
                />
            </Grid>
        </Grid>
    );
}
