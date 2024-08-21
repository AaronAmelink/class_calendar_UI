import {useEffect, useState} from "react";
import {
    Avatar,
    Button,
    CssBaseline,
    Grid,
    TextField,
    ThemeProvider,
} from "@mui/material";
import allThemes from "../../theme";
import Box from "@mui/material/Box";
import PersonIcon from '@mui/icons-material/Person';
import Container from "@mui/material/Container";
import httpHelper from '../../managment/httpHelper';
import {useNavigate} from "react-router-dom";
import pageURLs from "./pageURLs";
function LogInPage(){
    const [displayPswrdNotMatching, setDisplayPswrdNotMatching] = useState();
    const [loggingIn, setLoggingIn] = useState(true);
    const [emailTaken, setEmailTaken] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);
    const navigate = useNavigate();

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
                if (res?.error === "email taken"){
                    setEmailTaken(true);
                }
                else{
                    const loginSig = await httpHelper.loginRequest(email, password);
                    if (loginSig?.auth === true){
                        window.sessionStorage.setItem("authToken", 'Bearer ' + loginSig.signature);
                        window.sessionStorage.setItem("user_id", loginSig.userProfile._id);
                    }
                    else{
                        console.log("user registered, but could not complete login");
                    }
                }

            }
        }
        else{
            const res = await httpHelper.loginRequest(email, password);
            if (res?.auth === true){
                console.log("logged in");
                window.sessionStorage.setItem("authToken", 'Bearer ' + res.signature);
                window.sessionStorage.setItem("user_id", res.userProfile._id);
                navigate(pageURLs.classes);
            }
            if (res?.auth === false){
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
                        aria-label="password"
                        onSubmit={handleSubmit}
                        sx={{ width: '100%', textOverflow: 'clip' }}
                        color={'secondary'}
                    />
                    {wrongPassword &&
                        <h3>Incorrect Email / Password</h3>
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
                        sx={{ width: '100%', textOverflow: 'clip' }}
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
                        sx={{ width: '100%', textOverflow: 'clip' }}
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
                        sx={{ width: '100%', textOverflow: 'clip' }}
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
                            sx={{ width: '100%', textOverflow: 'clip' }}
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