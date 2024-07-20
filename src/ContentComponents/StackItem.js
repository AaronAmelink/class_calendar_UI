import Stack from "@mui/material/Stack";
import TextStackItem from "./StackItems/textStackItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import {Fade} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {useState} from "react";
import AddContentMenu from "./AddContentMenu";
import DividerStackItem from "./StackItems/DividerStackItem";
import CheckboxStackItem from "./StackItems/CheckboxStackItem";
import PageButtonStackItem from "./StackItems/PageButtonStackItem";
import {useDispatch} from "react-redux";
import {setSaved} from "../slices/pageDataSlice";
function StackItemContainer(props) {
    const id = props.id;
    const [isGarbageVisible, setIsGarbageVisible] = useState(false);
    const index =  props.index;
    const dispatch = useDispatch();

    const handleMouseEnter = () =>{
        setIsGarbageVisible(true);
    }
    const handleMouseExit = () =>{
        setIsGarbageVisible(false);
    }

    

    const handleDeleteClick = () => {
        dispatch(setSaved(false));
        props.removeContent(id);
    }

    return (
        <Stack
               onMouseOver={handleMouseEnter}
               onMouseOut={handleMouseExit}
        >
            <div style={{border: '0px solid', height: '100%', width:'90%'}}>
                <Grid container spacing={0}>
                    <Grid xs={11.2}>
                        {props.RenderObject}
                    </Grid>
                    <Grid xs={0.4}>
                        <Fade in={isGarbageVisible} style={{visibility: isGarbageVisible ? "visible" : "hidden"}}>
                            <div>
                                <AddContentMenu onPageUpdate={props.onPageUpdate} index={index}/>
                            </div>
                        </Fade>
                    </Grid>
                    <Grid xs={0.4}>
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

export default function StackItem(props) {
    const index =  props.index;
    const id = props.id;

    const RenderObject = () =>{
        if (props.object.type === "text"){
            return(
                <TextStackItem id={id} index={index}/>
            );
        }
        if (props.object.type === "divider"){
            return(
                <DividerStackItem/>
            );
        }
        if (props.object.type === "checkbox"){
            return(
                <CheckboxStackItem id={id} index={index} onPageUpdate={props.onPageUpdate}/>
            );
        }
        if (props.object.type === "page"){
            return(
              <PageButtonStackItem pageID={props.object.linkedPageID} onPageUpdate={props.onPageUpdate}/>
            );
        }
    }
    return (
        <StackItemContainer 
            id={props.id} 
            index={props.index} 
            onPageUpdate={props.onPageUpdate} 
            RenderObject={<RenderObject/>}
            removeContent={props.removeContent}
            object={props.object}
        />
    );
}
