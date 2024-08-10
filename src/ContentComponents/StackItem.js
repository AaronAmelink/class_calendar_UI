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

export function RenderObject({id, type, index}) {
    if (type === "text"){
        return(
            <TextStackItem id={id} index={index} key={'rot-' + id}/>
        );
    }
    if (type === "divider"){
        return(
            <DividerStackItem key={'rod-' + id}/>
        );
    }
    if (type === "checkbox"){
        return(
            <CheckboxStackItem index={index} id={id} key={'rocb-' + id}/>
        );
    }
    if (type === "page"){
        return(
            <PageButtonStackItem id={id} key={'rop-' + id}/>
        );
    }

}

export default function StackItem({id, type, index}) {
    console.log('rerender content');
    return (
        <StackItemContainer 
            id={id}
            index={index}
            key={'container' + '-' + id}
            RenderObject={<RenderObject id={id} type={type} index={index} key={'ro' + '-' + id}/>}
        />
    );
}
