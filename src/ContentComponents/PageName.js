import {TextField} from "@mui/material";
import {selectPageName} from "../slices/pageDataSlice";
import {useSelector} from "react-redux";
import usePageData from "../customHooks/pageDataHook";
import {useParams} from "react-router-dom";

export default function PageName() {
    const pageName = useSelector(selectPageName);
    const { updateName } = usePageData();
    const params = useParams();

    function handleChange(value) {
        updateName(value, params.pageID);
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