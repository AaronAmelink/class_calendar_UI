import {Button, FormControl, Grid, InputLabel, Paper, Select, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {Numbers, Class, School, Person, CalendarMonth, Add, Extension} from "@mui/icons-material";
import {useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
function ClassInputField({icon, label, required, numbersOnly, CSV}) {
    const [value, setValue] = useState('')

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
    const [yearsOffered, setYearsOffered] = useState('');
    const [season, setSeason] = useState([])

    function handleYearsOfferedChange(event) {
        setYearsOffered(event.target.value);
    }

    function handleSeasonChange(event) {
        setSeason(event.target.value);
    }

    return (
        <Paper elevation={0} variant='outlined' sx={{bgcolor:'background.elevated', boxShadow:5, height:1, px:5, overflow: 'auto'}}>
               <Stack container spacing={2}>
                   <Grid container spacing={2}>
                       <Grid item xs={4}>
                           <ClassInputField required icon={<Class sx={{mr: 1, my: 0.5 }}/>} label='Class Name'/>
                       </Grid>
                       <Grid item xs={4}>
                           <ClassInputField required icon={<Numbers sx={{mr: 1, my: 0.5 }}/>} label='Course Code'/>

                       </Grid>
                       <Grid item xs={4}>
                           <ClassInputField numbersOnly icon={<School sx={{mr: 1, my: 0.5 }}/>} label='Credit Worth'/>
                       </Grid>
                   </Grid>
                   <Grid container spacing={2}>
                       <Grid item xs={4}>
                           <ClassInputField CSV required icon={<Extension sx={{mr: 1, my: 0.5 }}/>} label='Pre Requisites'/>
                       </Grid>
                       <Grid item xs={4}>
                           <ClassInputField icon={<Person sx={{mr: 1, my: 0.5 }}/>} label='Professor'/>
                       </Grid>
                       <Grid item xs={4}>
                           <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
                               <CalendarMonth sx={{mr: 1, my: 0.5}}/>
                               <Grid container spacing={2}>
                                   <Grid item xs={6}>
                                       <FormControl variant='standard' sx={{width:1}}>
                                           <InputLabel>Season</InputLabel>
                                           <Select
                                               variant='standard'
                                               value={season}
                                               multiple
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
                                           <InputLabel>Offered</InputLabel>
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
                       <Grid item xs={12}>
                           <Box
                               display="flex"
                               justifyContent="center"
                               alignItems="center">
                               <Button color='secondary' startIcon={(<Add/>)} variant='contained' sx={{width:1/4}}>Add</Button>
                           </Box>
                       </Grid>
                   </Grid>
               </Stack>
        </Paper>
    );
}