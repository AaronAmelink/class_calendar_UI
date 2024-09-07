import {Paper} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import SemesterCard from "./SemesterCard";
import Stack from "@mui/material/Stack";
import ClassDialog from "./ClassDialog";
import {setIsLookingAtClass} from "../../slices/siteDataSlice";


export default function OrganizedClasses() {
    const classes = useSelector((state) => state.classData.classes);
    const [plannedSemesters, setPlannedSemesters] = useState([]);
    const dispatch = useDispatch();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedClassID, setSelectedClassID] = useState(null);

    function handleDialogClose() {
        dispatch(setIsLookingAtClass(null));
        setDialogOpen(false);
    }

    function handleChipClick(courseID) {
        setSelectedClassID(courseID);
        setDialogOpen(true);
        return courseID;
    }

    useEffect(() => {
        let allSemestersPlanned = []
        classes.forEach(classItem => {
            let planned = classItem.properties.find(prop => prop.name === 'Planned')?.value;
            if (planned) {
                allSemestersPlanned.push(planned);
            }
        });
        let newPlannedSemester = new Set(allSemestersPlanned ? allSemestersPlanned : []);
        setPlannedSemesters(newPlannedSemester ? [...newPlannedSemester] : []);
    }, [classes]);

    return (
        <Paper elevation={0}
               variant='outlined'
               sx={{bgcolor: 'background.elevated', boxShadow: 5, width: 1, height: 1, overflow: 'auto'}}
               display="flex"
               justifyContent="center"
               alignItems="center">
            <ClassDialog classID={selectedClassID} open={dialogOpen} handleClose={handleDialogClose}/>
            <Stack direction='row' sx={{height: 1, p: 5}} spacing={2}>
                {
                    plannedSemesters.map(semester => {
                        let relevantClasses = classes.filter(classItem => classItem.properties.find(prop => prop.name === 'Planned')?.value === semester);
                        return (<SemesterCard semester={semester} classes={relevantClasses}
                                              handleClick={handleChipClick}/>);
                    })
                }
            </Stack>

        </Paper>
    )
}