import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import TextValue from "./TextValue";
import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import NameValue from "./NameValue";

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
            <Stack>
                <Grid container spacing={2}>
                    <Grid>
                        <Name/>
                    </Grid>
                    <Grid>
                        <Divider orientation="vertical" variant="fullWidth" sx={{ bgcolor: "secondary.main" }}/>
                    </Grid>
                    <Grid>
                        <Value/>
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
    else{
        return (<null/>);
    }


}