import {TextField} from "@mui/material";
import {useMemo} from "react";
import {makePropertySelector} from "../../../slices/pageDataSlice";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import usePageData from "../../../customHooks/pageDataHook";

export default function NameValue({id}) {
    const propertySelector = useMemo(makePropertySelector, [])
    console.log('name value property render');
    const {updateProperty} = usePageData();
    const params = useParams();
    const property = useSelector(state =>
        propertySelector(state, id)
    );

    function handleChange(newValue) {
        updateProperty({...property, name: newValue}, params.pageID, id);
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