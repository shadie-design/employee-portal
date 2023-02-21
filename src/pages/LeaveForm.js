import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import Controls from "../components/controls/Controls";
import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { useForm, Form } from './useForm';
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';
import { useToasts } from "react-toast-notifications";
import SetCookie from '../../src/Hooks/SetCookie';
import GetCookie from '../../src/Hooks/GetCookie';
import 'date-fns'
import Api from '../contexts/Api';


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,


        },
        minHeight: 800
    },

}))








export default function LeaveForm(props) {
    const { addOrEdit, LoadLeaveRequests, openPopup, recordForEdit, setOpenPopup } = props
    const classes = useStyles();

    const initialFValues = {
        id: 0,
        leaveTypeName: '',
        startDate: new Date(),
        relieverId: '',
        leaveDuration: 0,
        leaveEnd: '',
        leaveBalance: '',
        resumptionDate: '',
    }

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('leaveTypeName' in fieldValues)
            temp.leaveTypeName = fieldValues.leaveTypeName ? "" : "This field is required."
        if ('startDate' in fieldValues)
            temp.startDate = fieldValues.startDate ? "" : "Date is invalid."
        if ('leaveDuration' in fieldValues)
            temp.leaveDuration = fieldValues.leaveDuration > 0.5 ? "" : "Minimum duration is 0.5 days."
        if ('relieverId' in fieldValues)
            temp.relieverId = fieldValues.relieverId ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const { addToast } = useToasts()
    const [LeaveTypeData, setLeaveTypeData] = useState([]);
    const [leaveTypeName, setLeaveTypeName] = useState(null);





    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    // Load LeaveTypes

    useEffect(() => {
        GetEmployeeLeaveTypes();
    }, []);


    const GetEmployeeLeaveTypes = () => {
        const employeeEmail = GetCookie("Email");
        const userToken = GetCookie("Token");
        const employeeLeaveRequestsUrl = Api.AppBaseUrl + 'EmployeePortal/Employee/GetEmployeeLeaveTypeNames/' + employeeEmail;
        fetch(employeeLeaveRequestsUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
            },
        })
            .then(res => res.json())
            .then((leaveTypeList) => {
                //  console.log(leaveTypeList);
                const EmployeeleaveTypeList = leaveTypeList;
                setLeaveTypeData(EmployeeleaveTypeList);
            })
    }




    const someDate = new Date(values.startDate);
    const numberOfDaysToAdd = Number(values.leaveDuration);
    const result = someDate.setDate(someDate.getDate() + (numberOfDaysToAdd));



    const createNewLeaveRequest = () => {
        const CreateLeaveRequestUrl = Api.AppBaseUrl + 'EmployeePortal/Employee/CreateLeaveRequest';
        const CustomStartDate = new Date(values.startDate)
        //ADD new leaveRequest
        const LeaveDuration = values.leaveDuration
        const StartDate = CustomStartDate
        const EndDate = new Date(result)
        const LeaveTypeName = leaveTypeName
        const EmployeeEmail = GetCookie("Email");
        const userToken = GetCookie("Token");

        if (LeaveDuration === null || LeaveTypeName === null || StartDate === null || LeaveDuration < 0.5) {

        } else {
            const requiredFields = { EmployeeEmail, LeaveTypeName, LeaveDuration, StartDate, EndDate }
            try {
                fetch(CreateLeaveRequestUrl, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`,
                    },
                    body: JSON.stringify(requiredFields)
                }).then(res => res.json())

                    .then((responseCode) => {
                    //    console.log(responseCode)
                        if (responseCode.success == true) {
                            addToast(responseCode.message, { appearance: 'success' });
                            setOpenPopup(false)
                            resetForm()
                        } else {
                            addToast(responseCode.errorMessage, { appearance: 'error' });
                            setOpenPopup(false)
                            resetForm()
                        }
                        LoadLeaveRequests()
                    })

            } catch (e) {

            }
        }
    }

    const updateLeaveRequest = () => {
        const CreateLeaveRequestUrl = Api.AppBaseUrl + 'EmployeePortal/Employee/UpdateEmployeeLeaveRequest';
        const CustomStartDate = new Date(values.startDate)
        //ADD new leaveRequest
        const Id = recordForEdit.id
        const LeaveDuration = values.leaveDuration
        const StartDate = CustomStartDate
        const EndDate = new Date(result)
        const LeaveTypeName = recordForEdit.leaveTypeName
        const EmployeeEmail = GetCookie("Email");
        const userToken = GetCookie("Token");
        const requiredFields = { Id, EmployeeEmail, LeaveTypeName, LeaveDuration, StartDate, EndDate }
        if (Id == null || LeaveDuration === null || LeaveTypeName === null || StartDate === null || LeaveDuration < 0.5) {
            console.log(requiredFields);
        } else {

            try {
                fetch(CreateLeaveRequestUrl, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`,
                    },
                    body: JSON.stringify(requiredFields)
                }).then(res => res.json())

                    .then((responseCode) => {
                    //    console.log(responseCode)
                        if (responseCode.success == true) {
                            addToast(responseCode.message, { appearance: 'success' });
                            setOpenPopup(false)
                            resetForm()
                        } else {
                            addToast(responseCode.errorMessage, { appearance: 'error' });
                            setOpenPopup(false)
                            resetForm()
                        }
                        LoadLeaveRequests()
                    })

            } catch (e) {

            }
        }
    }


    const handleClose = () => {
        setOpenPopup(false)
        resetForm()
    }

    const handleSubmit = e => {
        e.preventDefault()
        createNewLeaveRequest()
        if (validate()) {
            //   createNewLeaveRequest()
        }

    }



    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (

        <Dialog open={openPopup} elevation={0} className={classes.root}>
            <DialogTitle>
                <div className="flex justify-between items-center px-0 ">

                {recordForEdit === null ?  "Raise New Leave Request" : "Edit leave request" }
                    <IconButton
                        aria-label="close"
                        onClick={() => { handleClose() }}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <Close />
                    </IconButton>

                </div>

            </DialogTitle>

            <DialogContent dividers>
                <div className="flex justify-between items-center px-0 ">


                        <Form onSubmit={handleSubmit}>
                            <Grid container mb={12}>
                                <Grid item xs={6}>
                                  
                                        <FormControl variant="outlined">
                                            <InputLabel>Leave Type</InputLabel>
                                            <MuiSelect
                                                label="Leave Type"
                                                name="leaveTypeName"
                                                value={values.leaveTypeName}
                                                options={LeaveTypeData}
                                                onChange={handleInputChange}
                                                error={errors.leaveTypeName}>
                                                <MenuItem value="">None</MenuItem>
                                                {
                                                    LeaveTypeData.map(
                                                        (item, i) => (<MenuItem key={i} value={item} onClick={() => {
                                                            setLeaveTypeName(item)
                                                        }} >{item}</MenuItem>)
                                                    )
                                                }
                                            </MuiSelect>
                                            <Typography style={{ color: 'red', fontSize: 12, margin: 3.4 }}>{errors.leaveTypeName}</Typography>
                                        </FormControl>
                                    
                                    
                                        <Controls.DatePicker
                                            label="Leave Start"
                                            name="startDate"
                                            value={values.startDate}
                                            onChange={handleInputChange}
                                            error={errors.startDate}
                                        />
                               
                                </Grid>
                                <Grid item xs={6}>

                                   
                                        <Controls.Input
                                            label="Leave Duration"
                                            name="leaveDuration"
                                            type="number"
                                            value={values.leaveDuration}
                                            onChange={handleInputChange}
                                            error={errors.leaveDuration}
                                        />
                                

                                    
                                        <Controls.DatePicker
                                            label="Leave End"
                                            name="leaveEnd"
                                            value={result}
                                            onChange={handleInputChange}

                                        />
                                 
                                </Grid>
                            </Grid>
                        </Form>
                </div>
            </DialogContent>
            <DialogActions>

                <Button style={{ marginRight: 350 }} variant="contained" onClick={resetForm}>Reset</Button>
                {recordForEdit === null ? <Button variant="contained" color="primary" onClick={handleSubmit}>Add</Button> :
                    <Button variant="contained" color="primary" onClick={updateLeaveRequest}>Update</Button>}

                <Button variant="contained" style={{background:"orange", color:"black"}}  onClick={() => { handleClose() }}>Cancel</Button>

            </DialogActions>

        </Dialog>

    )
}
