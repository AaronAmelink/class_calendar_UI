import {Button, FormControl, Grid, InputLabel, Paper, Select, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {Numbers, Class, School, Person, CalendarMonth, Add, Extension} from "@mui/icons-material";
import {useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import {useDispatch} from "react-redux";
import {addClass} from "../slices/classDataSlice";
import Typography from "@mui/material/Typography";
const { v4: uuidv4 } = require('uuid');

function ClassInputField({icon, label, required, numbersOnly, CSV, value, setValue, error}) {

    function handleChange(event) {
        let filteredValue = event.target.value
        if (numbersOnly) {
            filteredValue = filteredValue.replace(/[^0-9.]/g, '');
        }
        if (CSV) {
            let [secondLast, last] = filteredValue.slice(-2)
            if (last === ' ' && secondLast !== ',') {
                filteredValue = filteredValue.slice(0,-1) + ', ';
            }
        }
        setValue(filteredValue);

    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            {icon}
            <TextField
                label={label}
                value={value}
                error={error}
                required={required}
                variant="standard"
                onChange={handleChange}
                sx={{
                    width: 1,
                    "& .MuiInputBase-input": {
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                    }
                }}
            />
        </Box>
    )
}

export default function AddNewClassMenu() {
    const dispatch = useDispatch();
    const [className, setClassName] = useState('');
    const [classNameEmpty, setClassNameEmpty] = useState(false);
    const [courseCodeEmpty, setCourseCodeEmpty] = useState(false);
    const [courseCode, setCourseCode] = useState('');
    const [creditWorth, setCreditWorth] = useState('');
    const [preRequisites, setPreRequisites] = useState('');
    const [professor, setProfessor] = useState('');
    const [season, setSeason] = useState([]);
    const [yearsOffered, setYearsOffered] = useState('');
    const inputSetters = [setClassName, setCourseCode, setCreditWorth, setPreRequisites, setProfessor, setYearsOffered];

    const handleSeasonChange = (event) => {
        setSeason(event.target.value);
    }
    const handleYearsOfferedChange = (event) => {
        setYearsOffered(event.target.value);
    }


    function handleAdd() {
        let invalidSubmit = false;
        if (className.replaceAll(' ', '') === '') {
            setClassNameEmpty(true);
            invalidSubmit = true;
        }
        if (courseCode.replaceAll(' ', '') === '') {
            setCourseCodeEmpty(true);
            invalidSubmit = true;
        }
        if (invalidSubmit) return;
        setClassNameEmpty(false);
        setCourseCodeEmpty(false);

        let id = uuidv4();
        let newClass = {
            professor: professor,
            seasonsOffered: season.toString(),
            className: className,
            courseCode: courseCode,
            creditWorth: creditWorth,
            preRequisites: preRequisites,
            yearsOffered: yearsOffered,
            id: id,
            planned: className
        };
        dispatch(addClass(newClass));
        console.log(newClass);

        inputSetters.forEach(setter => {
            setter('');
        });
        setSeason([]);
    }

    return (
        <Paper elevation={0} variant='outlined' sx={{bgcolor:'background.elevated', boxShadow:5, height:1, px:5, overflow: 'auto'}}>
            <Stack container spacing={2}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <ClassInputField required icon={<Class sx={{mr: 1, my: 0.5 }}/>} label='Class Name' value={className} setValue={setClassName}  error={classNameEmpty}/>
                    </Grid>
                    <Grid item xs={4}>
                        <ClassInputField required icon={<Numbers sx={{mr: 1, my: 0.5 }}/>} label='Course Code' value={courseCode} setValue={setCourseCode} error={courseCodeEmpty}/>

                    </Grid>
                    <Grid item xs={4}>
                        <ClassInputField numbersOnly icon={<School sx={{mr: 1, my: 0.5 }}/>} label='Credit Worth' value={creditWorth} setValue={setCreditWorth}/>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <ClassInputField CSV required icon={<Extension sx={{mr: 1, my: 0.5 }}/>} label='Pre Requisites' value={preRequisites} setValue={setPreRequisites} />
                    </Grid>
                    <Grid item xs={4}>
                        <ClassInputField icon={<Person sx={{mr: 1, my: 0.5 }}/>} label='Professor' value={professor} setValue={setProfessor}/>
                    </Grid>
                    <Grid item xs={4}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
                            <CalendarMonth sx={{mr: 1, my: 0.5}}/>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <FormControl variant='standard' sx={{width:1}}>
                                        <InputLabel>Season *</InputLabel>
                                        <Select
                                            variant='standard'
                                            value={season}
                                            multiple
                                            required
                                            onChange={handleSeasonChange}
                                        >
                                            <MenuItem value={'Fall'}>Fall</MenuItem>
                                            <MenuItem value={'Winter'}>Winter</MenuItem>
                                            <MenuItem value={'Summer'}>Summer</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl variant='standard' sx={{width:1}}>
                                        <InputLabel>Offered *</InputLabel>
                                        <Select
                                            variant='standard'
                                            value={yearsOffered}
                                            onChange={handleYearsOfferedChange}
                                        >
                                            <MenuItem value={'Every'}>Every Year</MenuItem>
                                            <MenuItem value={'Even'}>Even Years</MenuItem>
                                            <MenuItem value={'Odd'}>Odd Years</MenuItem>

                                        </Select>
                                    </FormControl>
                                </Grid>

                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Typography variant='caption'>
                            Items marked with * are required for autosort
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center">
                            <Button color='secondary' startIcon={(<Add/>)} variant='contained' sx={{width:1}} onClick={handleAdd}>Add</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>

                    </Grid>
                </Grid>
            </Stack>
        </Paper>
    );
}