import {useEffect, useState} from "react";
import DocumentManager from "../managment/documentManager";
import {TextField, Typography} from "@mui/material";
import {setSaved} from "../slices/pageDataSlice";
import {useDispatch} from "react-redux";

export default function PageName(props) {
    const [pageName, setPageName] = useState(DocumentManager.getCurrentPageName());
    const dispatch = useDispatch();
    useEffect(() => {
        setPageName(DocumentManager.getCurrentPageName());
    }, [props.pageID]);

    function handleChange(value) {
        setPageName(value);
        DocumentManager.updatePageName(value);
        dispatch(setSaved(false));
    }

    return(
        <TextField
            variant={"standard"}
            sx={{ input: { color: 'text.secondary' }, width: '100%', textOverflow: 'clip'}}
            inputProps={{style: {fontSize: 40}}}
            onChange={ e=>handleChange(e.target.value)}
            value={pageName}
            color={'underline'}
            focused
        />


    );
}