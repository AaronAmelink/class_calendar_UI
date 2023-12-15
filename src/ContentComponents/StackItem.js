import Stack from "@mui/material/Stack";
import TextStackItem from "./textStackItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {Fade, Grid} from "@mui/material";
import {useState} from "react";
import DocumentManager from "../managment/documentManager";
export default function StackItem(props) {
    const id = props.id;
    const [isGarbageVisible, setIsGarbageVisible] = useState(false);
    const index =  DocumentManager.getContentIndex(id);
    const [render, SetRender] = useState(DocumentManager.currentPage.content[index] ? true : false);

    const handleMouseEnter = () =>{
        setIsGarbageVisible(true);
    }
    const handleMouseExit = () =>{
        setIsGarbageVisible(false);
    }
    const RenderObject = () =>{
        if (props.object.type === "text"){
            return(
                <TextStackItem id={id} onPageUpdate={props.onPageUpdate} setRender={SetRender}/>
            );
        }
    }

    const handleDeleteClick = () => {
        DocumentManager.removeContent(id);
        SetRender(false);
    }

    if (render){
        return (
            <Stack item
                   onMouseOver={handleMouseEnter}
                   onMouseOut={handleMouseExit}
            >
                <div style={{border: '1px solid', height: '100%'}}>

                <Grid container spacing={0}>
                    <Grid item xs="11.2">
                        <RenderObject/>
                    </Grid>
                    <Grid item sx={{mt:-0.5}} xs>
                        <Fade in={isGarbageVisible} style={{visibility: isGarbageVisible ? "visible" : "hidden"}}>

                            <IconButton aria-label="plus" sx={{color:"text.main"}}>
                                <AddIcon />
                            </IconButton>
                        </Fade>
                        <Fade in={isGarbageVisible} style={{visibility: isGarbageVisible ? "visible" : "hidden"}}>
                            <IconButton aria-label="delete" sx={{color:"text.main"}} onClick={handleDeleteClick}>
                                <DeleteIcon />
                            </IconButton>
                        </Fade>

                    </Grid>

                </Grid>
                </div>
            </Stack>
        );
    }
    else{
        return(<null/>);
    }

}
