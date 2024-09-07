import {TextField} from "@mui/material";
import {useMemo} from "react";
import {makePropertySelector} from "../../../slices/pageDataSlice";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import usePageData from "../../../customHooks/pageDataHook";

export default function NameValue({id, classID = null}) {
    const propertySelector = useMemo(makePropertySelector, [])
    const {updateProperty} = usePageData();
    const params = useParams();
    const property = useSelector(state =>
        propertySelector(state, {id, classID})
    );

    function handleChange(newValue) {
        updateProperty({...property, name: newValue}, classID ? classID : params.pageID, id);
    }

    return (
        <TextField
            variant={"outlined"}
            sx={{input: {color: 'text.main'}, textOverflow: 'clip'}}
            onChange={e => handleChange(e.target.value)}
            value={property?.name}
        />
    )
}