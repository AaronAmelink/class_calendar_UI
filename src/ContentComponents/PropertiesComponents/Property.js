import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import TextValue from "./TextValue";
import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import NameValue from "./NameValue";
import usePageData from "../../customHooks/pageDataHook";
import {useParams} from "react-router-dom";

export default function Property({id, type}){
    const {removeProperty} = usePageData();
    const params = useParams();
    function handleDeleteClick() {
        removeProperty(id, params.pageID);
    }

    return (
        <Stack>
            <Grid container spacing={2}>
                <Grid>
                    <Name id={id}/>
                </Grid>
                <Grid>
                    <Divider orientation="vertical" variant="fullWidth" sx={{ bgcolor: "secondary.main" }}/>
                </Grid>
                <Grid>
                    <Value id={id} type={type}/>
                </Grid>
                <Grid>
                    <IconButton aria-label="delete" sx={{color:"text.main", mt:1}} onClick={handleDeleteClick}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Stack>
    );
}

function Value({id, type}) {
    if (type === 'text') {
        return (<TextValue id={id}/>);
    }
}

function Name({id}) {
    return (<NameValue id={id}/>);
}