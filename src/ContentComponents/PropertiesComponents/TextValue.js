import {TextField} from "@mui/material";
import {useMemo, useState} from "react";
import DocumentManager from "../../managment/documentManager"
import {makePropertySelector, setSaved} from "../../slices/pageDataSlice";
import {useDispatch, useSelector} from "react-redux";
import usePageData from "../../customHooks/pageDataHook";
import {useParams} from "react-router-dom";

export default function TextValue({id}){
    const propertySelector = useMemo(makePropertySelector, [])
    const { updateProperty } = usePageData();
    const params = useParams();
    console.log('text value property render');
    const property = useSelector(state =>
        propertySelector(state, id)
    );

    function handleChange(newValue) {
        updateProperty({...property, value: newValue}, params.pageID, id);
    }

    return (
        <TextField
            variant={"outlined"}
            sx={{ input: { color: 'text.main' }, textOverflow: 'clip' }}
            onChange={ e=>handleChange(e.target.value)}
            value={property?.value}
        />
    )
}