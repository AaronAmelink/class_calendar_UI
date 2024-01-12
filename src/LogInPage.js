import {useEffect, useState} from "react";
import {
    Avatar,
    Button,
    CssBaseline,
    FormControlLabel,
    Grid,
    Icon,
    Paper,
    styled,
    TextField,
    ThemeProvider,
    Typography
} from "@mui/material";
import allThemes from "./theme";
import Box from "@mui/material/Box";
import PersonIcon from '@mui/icons-material/Person';
import DocumentManager from "./managment/documentManager";
import Container from "@mui/material/Container";
import httpHelper from "./managment/httpHelper";

function LogInPage(){
    const [email, setEmail] = useState("hallo");
    const [pswrd, setPwsrd] = useState("hallo");
    const [registering, setRegistering] = useState(true);


    async function handleSubmit() {
        await httpHelper.loginRequest(email, pswrd);
        console.log("sent request");
    }
    const RenderedInputs = () =>{
        if (registering){
            return (
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    text={pswrd}
                    sx={{ input: { color: 'text.main' }, width: '100%', textOverflow: 'clip' }}
                    color={'secondary'}
                />
            );
        }
        else{
            return (
                <div>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        sx={{ input: { color: 'text.main' }, width: '100%', textOverflow: 'clip' }}
                        color={'secondary'}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        autoComplete="current-password"
                        sx={{ input: { color: 'text.main' }, width: '100%', textOverflow: 'clip' }}
                        color={'secondary'}
                    />
                </div>
            );
        }
    }

    useEffect(() => {

    }, [registering]);

    function handleClick() {
        if (registering){
            setRegistering(false);
        }
        else {
            setRegistering(true);
        }
    }

    return (
        <ThemeProvider theme={allThemes.dark}>
            <CssBaseline/>
            <Container maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        color:"text.main"
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <PersonIcon />
                    </Avatar>
                    <Grid container sx={{ mt: 3, mb: 2, ml:3}} justifyContent="center" alignItems="center">
                        <Grid>
                            <Button color={"secondary"} variant={!registering ? "outlined" : "contained"} onClick={handleClick} sx={{mr:4}}>Login</Button>
                        </Grid>
                        <Grid>
                            <Button color={"secondary"} variant={registering ? "outlined" : "contained"} onClick={handleClick} sx={{mr:4}}> Sign up </Button>
                        </Grid>
                    </Grid>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1}}>
                        <TextField
                            required
                            label="Email Address"
                            autoComplete="email"
                            margin="normal"
                            autoFocus
                            text={email}
                            sx={{ input: { color: 'text.main' }, width: '100%', textOverflow: 'clip' }}
                            color={'secondary'}
                        />
                        <RenderedInputs/>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {registering ? "Sign in" : "Sign up"}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
        );
}
export default LogInPage;