import Stack from "@mui/material/Stack";
import TextStackItem from "./StackItems/textStackItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {Fade, Grid} from "@mui/material";
import {useState} from "react";
import DocumentManager from "../managment/documentManager";
import AddContentMenu from "./AddContentMenu";
import DividerStackItem from "./StackItems/DividerStackItem";
import CheckboxStackItem from "./StackItems/CheckboxStackItem";
import PageButtonStackItem from "./StackItems/PageButtonStackItem";
export default function StackItem(props) {
    const id = props.id;
    const [isGarbageVisible, setIsGarbageVisible] = useState(false);
    const index =  props.index;

    const handleMouseEnter = () =>{
        setIsGarbageVisible(true);
    }
    const handleMouseExit = () =>{
        setIsGarbageVisible(false);
    }
    const RenderObject = () =>{
        if (props.object.type === "text"){
            return(
                <TextStackItem id={id} index={index} removeContent={props.removeContent}/>
            );
        }
        if (props.object.type === "divider"){
            return(
                <DividerStackItem/>
            );
        }
        if (props.object.type === "checkbox"){
            return(
                <CheckboxStackItem id={id} index={index} removeContent={props.removeContent} onPageUpdate={props.onPageUpdate}/>
            );
        }
        if (props.object.type === "page"){
            return(
              <PageButtonStackItem pageID={props.object.linkedPageID} onPageUpdate={props.onPageUpdate}/>
            );
        }
    }

    const handleDeleteClick = () => {
        props.removeContent(id);
    }


    return (
        <Stack item
               onMouseOver={handleMouseEnter}
               onMouseOut={handleMouseExit}
        >
            <div style={{border: '0px solid', height: '100%', width:'90%'}}>
                <Grid container spacing={0}>
                    <Grid item xs="11.2">
                        <RenderObject/>
                    </Grid>
                    <Grid item xs="0.4">
                        <Fade in={isGarbageVisible} style={{visibility: isGarbageVisible ? "visible" : "hidden"}}>
                            <div>
                                <AddContentMenu onPageUpdate={props.onPageUpdate} index={index}/>
                            </div>
                        </Fade>
                    </Grid>
                    <Grid item xs="0.4">
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
