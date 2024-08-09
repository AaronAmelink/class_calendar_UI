// A custom theme for this app
import {createTheme} from "@mui/material";
const dark = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    scrollbarColor: "#6b6b6b #2b2b2b",
                    "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                        backgroundColor: "#2b2b2b",
                    },
                    "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                        borderRadius: 8,
                        backgroundColor: "#6b6b6b",
                        minHeight: 24,
                        border: "3px solid #2b2b2b",
                    },
                    "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
                        backgroundColor: "#959595",
                    },
                    "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
                        backgroundColor: "#959595",
                    },
                    "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "#959595",
                    },
                    "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
                        backgroundColor: "#2b2b2b",
                    },
                },
            },
        },
    },
    palette: {
        mode: 'dark',
        primary: {
            main: '#383838',
        },
        secondary: {
            main: '#0096ab',
        },
        icon: {
            main: '#0096ab',
        },
        background: {
            default: '#1c1c1c',
            elevated: '#232323',
            paper: '#2a2a2a',
        },
        menu: {
            main: '#0096ab',
            settings: '#414141',
            button: '#545454',
            selected: '#0096ab'
        },
        underline: {
            main: '#0096ab',
            secondary: '#787878',
        },
        text:{
            primary:'#e3e3e3',
            secondary:'#d1d1d1'
        },
    }
});
const light = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#ffffff',
        },
        secondary: {
            main: '#00acc9',
        },
        icon: {
            main: '#0096ab',
        },
        background: {
            default: '#ececec',
            paper: '#ffffff',
        },
        menu: {
            main: '#d2faff',
            settings: '#d8d8d8',
            button: '#ffffff',
            selected: '#a3e2f1'
        },
        underline: {
            main: '#8feeff',
            secondary: '#787878'
        },
        text:{
            main:'#313131',
            secondary:'#313131'
        }
    }
});

const allThemes = {
    light : light,
    dark : dark
}
export default allThemes;