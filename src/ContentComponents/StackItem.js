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
import usePageData from "../customHooks/pageDataHook";
function StackItemContainer(props) {
    const id = props.id;
    const {removeContent} = usePageData();
    const [isGarbageVisible, setIsGarbageVisible] = useState(false);
    const index =  props.index;


    const handleMouseEnter = () =>{
        setIsGarbageVisible(true);
    }
    const handleMouseExit = () =>{
        setIsGarbageVisible(false);
    }

    const handleDeleteClick = () => {
        removeContent(id);
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
                                <AddContentMenu index={index}/>
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

export default function StackItem({id, type, key, index}) {
    console.log('rerender content');
    const RenderObject = () =>{
        if (type === "text"){
            return(
                <TextStackItem id={id} index={index}/>
            );
        }
        if (type === "divider"){
            return(
                <DividerStackItem/>
            );
        }
        if (type === "checkbox"){
            return(
                <CheckboxStackItem index={index} id={id}/>
            );
        }
        if (type === "page"){
            return(
              <PageButtonStackItem id={id}/>
            );
        }
    }
    return (
        <StackItemContainer 
            id={id}
            index={index}
            RenderObject={<RenderObject/>}
        />
    );
}
