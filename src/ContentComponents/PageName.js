import {useState} from "react";
import DocumentManager from "../managment/documentManager";
import {TextField, Typography} from "@mui/material";

export default function PageName(props) {
    const pageId = props.pageID;
    const [pageName, setPageName] = useState(DocumentManager.getCurrentPageName());


    function handleChange(value) {
        setPageName(value);
        DocumentManager.updatePageName(value);
    }

    return(
        <TextField
            variant={"standard"}
            sx={{ input: { color: 'text.secondary' }, width: '100%', textOverflow: 'clip'}}
            inputProps={{style: {fontSize: 40}}}
            onChange={ e=>handleChange(e.target.value)}
            value={pageName}
            color={'secondary'}
            focused
        />


    );
}