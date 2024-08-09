import {Grid} from "@mui/material";
import {useState} from "react";
import IconButton from "@mui/material/IconButton";
const colors = [
    '#FF0000',
    '#FF7F00',
    '#FFFF00',
    '#00FF00',
    '#0000FF',
    '#4B0082',
    '#9400D3',
    "#FF8080",
    "#FFB380",
    "#FFFF80",
    "#80FF80",
    "#8080FF",
    "#9F60B2",
    "#C580F0",
    "#0096ab"
]
export default function ColorPicker({setColor}) {
    const [selected, setSelected] = useState('');
    return (
            <Grid container spacing={0.5} sx={{m:1}}>
                {
                    colors.map(color => {
                        return (
                            <Grid item xs={2}>
                                <IconButton  key={color}
                                       onClick={() => {
                                           if (setColor) {
                                               setColor(color)
                                           }
                                           setSelected(color);
                                       }}
                                       sx={{
                                           bgcolor: color,
                                           color:'text.primary',
                                           cursor: 'pointer',
                                           border: selected === color ? '2px solid': 'none',
                                           ':hover': {
                                               bgcolor: color, // theme.palette.primary.main
                                               color: selected === color ? '2px solid': 'none',
                                           }
                                       }}
                                     size={'large'}
                                />
                            </Grid>
                        )
                    })
                }
            </Grid>
    )
}