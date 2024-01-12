import Stack from "@mui/material/Stack";
import {Divider, Grid} from "@mui/material";
import TextValue from "./TextValue";
import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import NameValue from "./NameValue";
import {useEffect, useState} from "react";
import DocumentManager from "../../managment/documentManager";

export default function Property(props){ // props is the referenced for passed down variables. Naming is confusing.
    const type = props.property.type;
    const id = props.property.id;

    const Value = () => {
        if (type === "text") {
            return (<TextValue id={id}/>);
        }
    }

    const Name = () => {
        return (<NameValue id={id}/>);
    }

    function handleDeleteClick() {
        props.removeProperty(id); //function from properties menu
    }

    if (props.property.type === "text"){
        return (
            <Stack item>
                <Grid container spacing={2}>
                    <Grid item>
                        <Name/>
                    </Grid>
                    <Grid item>
                        <Divider orientation="vertical" variant="fullWidth" sx={{ bgcolor: "secondary.main" }}/>
                    </Grid>
                    <Grid item>
                        <Value/>
                    </Grid>
                    <Grid item>
                        <IconButton aria-label="delete" sx={{color:"text.main", mt:1}} onClick={handleDeleteClick}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Stack>
        );
    }
    else{
        return (<null/>);
    }


}