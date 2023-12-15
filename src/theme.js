// A custom theme for this app
import {createTheme} from "@mui/material";

const dark = createTheme({
    palette: {
        primary: {
            main: '#151515',
        },
        secondary: {
            main: '#00869d',
            secondary: '#414141'
        },
        background:{
            default:'#151515',
        },
        text:{
            main:'#989898',
            secondary:'#c4c4c4'
        }
    },
});
const light = createTheme({
    palette: {
        primary: {
            main: '#ffffff',
        },
        secondary: {
            main: '#00acc9',
        },
    },
});

const allThemes = {
    light : light,
    dark : dark
}
export default allThemes;