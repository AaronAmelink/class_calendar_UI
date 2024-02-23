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
const httpHelperClass = require('./managment/httpHelper');
const httpHelper = new httpHelperClass();
function LogInPage(props){
    const [displayPswrdNotMatching, setDisplayPswrdNotMatching] = useState();
    const [loggingIn, setLoggingIn] = useState(true);
    const [emailTaken, setEmailTaken] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);


    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let email = data.get('email');
        let password = data.get('password');
        let confirmPassword = data.get('confirm password');
        let userName = data.get('username');
        setEmailTaken(false);
        if (userName === null){
            userName = '';
        }
        if (password === null){
            password = '';
        }
        if (email === null){
            email = ''
        }
        if (!loggingIn){
            if (password !== confirmPassword){
                setDisplayPswrdNotMatching(true);
            }
            else{
                setDisplayPswrdNotMatching(false);
                const res = await httpHelper.registerRequest(userName, email, password);
                console.log(res);
                if (res.error && res.error === "email taken"){
                    setEmailTaken(true);
                }

            }
        }
        else{
            const res = await httpHelper.loginRequest(email, password);
            if (res.auth === true){
                console.log("logged in");
                window.sessionStorage.setItem("authToken", 'Bearer ' + res.signature);
                window.sessionStorage.setItem("user_id", res.userProfile._id);
                props.setLoggedin(true);
            }
            if (res.auth === false){
                console.log("incorrect email/password");
                setWrongPassword(true);
            }
        }

    }

    const RenderedInputs = () =>{
        if (loggingIn){
            return (
                <div>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        onSubmit={handleSubmit}
                        sx={{ input: { color: 'text.main' }, width: '100%', textOverflow: 'clip' }}
                        color={'secondary'}
                    />
                    {wrongPassword &&
                        <h2>Wrong password</h2>
                    }
                </div>

            );
        }
        else{
            return (
                <div>
                    <TextField
                        noValidate
                        margin="normal"
                        required
                        fullWidth
                        name="username"
                        label="User Name"
                        sx={{ input: { color: 'text.main' }, width: '100%', textOverflow: 'clip' }}
                        color={'secondary'}
                    />
                    <TextField
                        noValidate
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        name="password"
                        label="Set Password"
                        sx={{ input: { color: 'text.main' }, width: '100%', textOverflow: 'clip' }}
                        color={'secondary'}
                    />
                    <TextField
                        noValidate
                        type="password"
                        margin="normal"
                        required
                        fullWidth
                        label="Confirm Password"
                        name="confirm password"
                        sx={{ input: { color: 'text.main' }, width: '100%', textOverflow: 'clip' }}
                        color={'secondary'}
                    />
                    {displayPswrdNotMatching &&
                    <h2>Passwords do not match</h2>
                    }
                    {emailTaken &&
                        <h2>Email taken</h2>
                    }
                </div>
            );
        }
    }

    useEffect(() => {

    }, [loggingIn]);

    function handleClick() {
        if (loggingIn){
            setLoggingIn(false);
        }
        else {
            setLoggingIn(true);
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
                            <Button color={"secondary"} variant={!loggingIn ? "outlined" : "contained"} onClick={handleClick} sx={{mr:4}}>Login</Button>
                        </Grid>
                        <Grid>
                            <Button color={"secondary"} variant={loggingIn ? "outlined" : "contained"} onClick={handleClick} sx={{mr:4}}> Sign up </Button>
                        </Grid>
                    </Grid>
                    <Box component="form" noValidate sx={{ mt: 1}} onSubmit={handleSubmit}>
                        <TextField
                            required
                            label="Email Address"
                            margin="normal"
                            name="email"
                            sx={{ input: { color: 'text.main' }, width: '100%', textOverflow: 'clip' }}
                            color={'secondary'}
                        />
                        <RenderedInputs/>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            type="submit"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {loggingIn ? "Sign in" : "Sign up"}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
        );
}
export default LogInPage;