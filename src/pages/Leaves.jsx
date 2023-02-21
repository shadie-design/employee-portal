import React, { useEffect, useState } from 'react';
import { FiCheck, FiClock, FiMinus, FiSettings, FiTrash, FiWatch, FiXCircle } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import Api from "../contexts/Api"
import SetCookie from '../../src/Hooks/SetCookie';
import GetCookie from '../../src/Hooks/GetCookie';
import { GridComponent, Search, ExcelExport, Group, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { useToasts } from "react-toast-notifications";
import { customersData, customersGrid } from '../data/dummy';
import { Header } from '../components';

//material UI grid
import { Grid, Dialog, DialogActions, ButtonGroup, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import { Paper, TableBody, TableRow, TableCell, Toolbar } from '@material-ui/core';
import { TableContainer } from '@material-ui/core';
import useTable from "./useTable";
import { makeStyles } from '@material-ui/core/styles'
import Controls from "../components/controls/Controls"
import { Remove, Add } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import { Box } from '@material-ui/core';
import { Table, TablePagination } from '@material-ui/core';
import { TableHead } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import format from 'date-fns/format';
import LeaveForm from './LeaveForm';
import 'date-fns'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      minWidth: 230,


    },
    minHeight: 800,

    '&$hover:hover': {
      // Set hover color
      backgroundColor: "transparent",
    },
  },
  hover: {},

}))


const headCells = [
  { id: 'expand', label: ' ' },
  { id: 'leaveReferenceNumber', label: 'leave Ref.No.' },
  { id: 'leaveType', label: 'Leave Type' },
  { id: 'duration', label: 'Leave Duration' },
  { id: 'leaveStart', label: 'Leave Start' },
  { id: 'leaveEnd', label: 'Leave End' },
  { id: 'leaveBalance', label: 'Leave Balance' },
  { id: 'leaveStatus', label: 'Leave Status' },
  { id: 'actions', label: 'Actions', disableSorting: true }
]





const Leaves = () => {
  const [employeeleaveRequests, setEmployeeleaveRequests] = useState();
  const { isLoggedIn, setIsLoggedIn, setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();


  const { addToast } = useToasts()
  //material Ui code start

  //--table properties code 
  const [LeaveTypeData, setLeaveTypeData] = useState([]);
  const GetEmployeeLeaveTypes = () => {
    const employeeEmail = GetCookie("Email");
    const userToken = GetCookie("Token");
    const employeeLeaveRequestsUrl = Api.AppBaseUrl + 'EmployeePortal/Employee/GetEmployeeLeaveTypes/' + employeeEmail;
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
  //------
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [recordFordelete, setRecordForDelete] = useState(null)
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
  const [gridData, setGridData] = useState([]);
  const [records, setRecords] = useState(null)
  const [openPopup, setOpenPopup] = useState(false)
  const [openDeletePopup, setOpenDeletePopup] = useState(false)


  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(records, headCells, filterFn);


  //Function to Add or Edit

  const addOrEdit = (leaveRequest, resetForm) => {

    if (leaveRequest.id == 0)
      addNewLeaveRequest(leaveRequest)
    // add an else to hold update leave Request
    resetForm()
    setRecordForEdit(null)
    setOpenPopup(false)

    GetEmployeeLeaveRequests();
  }
  //     //pagination
  const savedRowsNumber = 5
  const [rowsPerPage, setRowsPerPage] = React.useState(savedRowsNumber)
  const [page, setPage] = React.useState(0)
  const today = new Date()

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    localStorage.setItem('customRowsPerPage', +event.target.value)
    setRowsPerPage(+event.target.value)
    setPage(0)
  }



  const openInDialog = item => {
    setRecordForEdit(item)
    setOpenPopup(true)
  }
  const DeleteLeaveRequest = (id) => {
    const userToken = GetCookie("Token");
    const employeeLeaveRequestsUrl = Api.AppBaseUrl + 'EmployeePortal/Employee/DeleteLeaveRequest/' + id;
    fetch(employeeLeaveRequestsUrl, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      },
    })
      .then(res => res.json())
      .then((responseCode) => {
        console.log(responseCode)
        if (responseCode.success == true) {
          addToast(responseCode.message, { appearance: 'success' });
          setOpenDeletePopup(false)
        } else {
          addToast(responseCode.errorMessage, { appearance: 'error' });
          setOpenDeletePopup(false)
        }
        GetEmployeeLeaveRequests()
      })
  }
  const handleDeleteDialog = (item) => {
    setRecordForDelete(item)
    setOpenDeletePopup(true)
    console.log(recordFordelete);
  }

  const handleDeleteClose = () => {
    setOpenDeletePopup(false)
  }

  //material Ui code end

  useEffect(() => {
    GetEmployeeLeaveRequests();
    GetEmployeeLeaveTypes();
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    const currentLoginStatus = localStorage.getItem('isLoggedIn');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
    if (currentLoginStatus) {
      setIsLoggedIn(isLoggedIn);
    }
  }, []);

  const GetEmployeeLeaveRequests = () => {
    const employeeEmail = GetCookie("Email");
    const userToken = GetCookie("Token");
    const employeeLeaveRequestsUrl = Api.AppBaseUrl + 'EmployeePortal/Employee/GetEmployeeLeaveRequests/' + employeeEmail;
    fetch(employeeLeaveRequestsUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      },
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        setEmployeeleaveRequests(data);
        setGridData(data);
      });
  }

  const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);


    return (
      <>
        <TableRow hover classes={classes} {...otherProps}>
          <TableCell style={{ color: currentMode === 'Dark' ? 'white' : 'black', }} padding="checkbox">
            <IconButton onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <Remove style={{ color: currentMode === 'Dark' ? 'white' : 'black', }} /> : <Add style={{ color: currentMode === 'Dark' ? 'white' : 'black', }} />}
            </IconButton>
          </TableCell>
          {children}
        </TableRow>
        {isExpanded && (
          <TableRow hover classes={classes}>
            <TableCell style={{ color: currentMode === 'Dark' ? 'white' : 'black', }} padding="checkbox" />
            {expandComponent}
          </TableRow>
        )}
      </>
    );
  };


  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
          <TooltipComponent
            content="Settings"
            position="Top"
          >
            <button
              type="button"
              onClick={() => setThemeSettings(true)}
              style={{ background: currentColor, borderRadius: '50%' }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <FiSettings />
            </button>

          </TooltipComponent>
        </div>
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
              : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
          }
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
          </div>
          <div>
            {themeSettings && (<ThemeSettings />)}


            <div className="mt-20">



              <Paper style={{background:"transparent", margin:20}}>

                <div style={{ marginBottom: 30 }}>

                  <Grid container spacing={3} className="mb-6">
                    <Grid item xs={12} md={6}>


                      <div >
                        <div style={{ textAlign: 'center' }}>
                          <p className="text-18" style={{ color: currentMode === 'Dark' ? 'white' : 'black', fontWeight: 600 }}>Period :{today.getFullYear() - 1} / {today.getFullYear()} FY</p>
                        </div>

                        <TableContainer style={{ paddingLeft: 20, paddingRight: 20, width: '100%', height: 330 }} >
                          <Table aria-label="collapsible table" style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 0, paddingTop: 20, border: '1px solid rgba(224, 224, 224, 1)' }}  >
                            <TableHead  >
                              <TableRow >
                                <TableCell></TableCell>
                                <TableCell className="text-14" style={{ color: currentMode === 'Dark' ? 'white' : 'black', fontWeight: 100, paddingLeft: 20, border: '1px solid rgba(224, 224, 224, 1)' }} >Carry Forward</TableCell>
                                <TableCell className="text-14" style={{ color: currentMode === 'Dark' ? 'white' : 'black', fontWeight: 100, paddingLeft: 20, border: '1px solid rgba(224, 224, 224, 1)' }} >Annual Entitlement</TableCell>
                                <TableCell className="text-14" style={{ color: currentMode === 'Dark' ? 'white' : 'black', fontWeight: 100, paddingLeft: 20, border: '1px solid rgba(224, 224, 224, 1)' }}> Leave Balance</TableCell>

                              </TableRow>
                            </TableHead>
                            <TableBody >
                              {
                                LeaveTypeData.map(
                                  (item, i) => (
                                    <TableRow key={i} >
                                      <TableCell className="text-14" style={{ color: currentMode === 'Dark' ? 'white' : 'black', fontWeight: 100, paddingLeft: 20, border: '1px solid rgba(224, 224, 224, 1)' }}>{item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()}</TableCell>
                                      <TableCell align='center' style={{ color: currentMode === 'Dark' ? 'white' : 'black' }} > {item.carryForwardValue} days</TableCell>
                                      <TableCell align='center' style={{ color: currentMode === 'Dark' ? 'white' : 'black', border: '1px solid rgba(224, 224, 224, 1)' }} >{item.entitlementDuration} days</TableCell>
                                      <TableCell align='center' ></TableCell>
                                    </TableRow>

                                  )

                                )
                              }

                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div>


                    </Grid>
                    <Grid item xs={12} md={6} className='flex justify-center items-center'>

                      <div className="flex w-full justify-center items-center row">

                        {/* For summary */}
                        <div className="bg-white dark:bg-secondary-dark-bg p-2 rounded-lg w-100">
                          <div className="flex w-full items-center">
                          <div className="p-4 hover:drop-shadow-xl hover:bg-light-gray"
                          style={{ background: currentColor, color: "white" }}>
                          Current status
                        </div>
                        <div className="p-4 w-96 hover:drop-shadow-xl hover:bg-light-gray"
                          style={{ background: '#FFD580', color: "black" }}>
                          On Leave (Paternity leave)  | 5 days remaining
                        </div> 
                          </div>

                          <div>
                            <div className="flex gap-5 border-b-1 border-color p-2 pt-2">
                             
                              <div>
                                <p className="font-semibold dark:text-gray-200 ">Leave type</p>
                                <p className="text-gray-500 text-sm dark:text-gray-400"> Paternity leave </p>
                              </div>
                            </div>

                            <div className="flex gap-5 border-b-1 border-color p-2 ">                             
                              <div>
                                <p className="font-semibold dark:text-gray-200 ">From</p>
                                <p className="text-gray-500 text-sm dark:text-gray-400"> 17/2/2023 - 25/2/2023 </p>
                              </div>
                            </div>
                              
                            <div className="flex gap-5 border-b-1 border-color p-2 ">                             
                              <div>
                                <p className="font-semibold dark:text-gray-200 ">Duration</p>
                                <p className="text-gray-500 text-sm dark:text-gray-400"> 8 days </p>
                              </div>
                            </div>

                            <div className="flex gap-5 border-b-1 border-color p-2 ">                             
                              <div>
                                <p className="font-semibold dark:text-gray-200 ">Balance</p>
                                <p className="text-gray-500 text-sm dark:text-gray-400"> 5 days </p>
                              </div>
                            </div>
         

                          </div>

                        </div>
                        

                        {/* <div className="p-4 hover:drop-shadow-xl hover:bg-light-gray"
                          style={{ background: currentColor, color: "white" }}>
                          Current status
                        </div>
                        <div className="p-4 hover:drop-shadow-xl hover:bg-light-gray"
                          style={{ background: '#FFD580', color: "black" }}>
                          On Leave | End Date : 12/11/2021
                        </div> */}



                      </div>

                    </Grid>

                  </Grid>
                </div>

                <Toolbar>
                  <button
                    type="button"
                    style={{ backgroundColor: currentColor, color: "white", borderRadius: "1px" }}
                    className={`  p-2  hover:drop-shadow-xl hover:bg-none`}
                    onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                  ><AddIcon /> Raise New Leave Request
                  </button>
                  {/* <Controls.Button
                    text=" Raise New Leave Request"
                    variant="contained"
                    startIcon={<AddIcon />}
                    style={{ background: currentMode }}
                    className={classes.newButton}
                    onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                  /> */}
                </Toolbar>
                <TblContainer>
                  <TblHead />
                  <TableBody>
                    {


                      gridData.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      ).map(item =>
                      (
                        <ExpandableTableRow
                          key={item.id}
                          expandComponent={


                            <TableCell style={{ color: currentMode === 'Dark' ? 'white' : 'black', paddingBottom: 0, paddingTop: 0, paddingLeft: 130 }} colSpan={6}>

                              <Box >

                                <Table size="small" aria-label="note" style={{ background: "transparent" }} >
                                  <TableHead style={{ background: "transparent" }}>
                                    <TableRow>
                                      <TableCell  >Approver</TableCell>
                                      <TableCell >Action</TableCell>
                                      <TableCell  >Date</TableCell>
                                      <TableCell >Remarks</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>

                                    <TableRow hover classes={classes} key={2}>
                                      <TableCell style={{ color: currentMode === 'Dark' ? 'white' : 'black', }} component="th" scope="row">
                                        Elius
                                      </TableCell>
                                      <TableCell style={{ color: currentMode === 'Dark' ? 'white' : 'black', }} >Pending</TableCell>
                                      <TableCell style={{ color: currentMode === 'Dark' ? 'white' : 'black', }}>{item.startDate}</TableCell>
                                      <TableCell style={{ color: currentMode === 'Dark' ? 'white' : 'black', }} align="right">
                                        {item.reliever}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow hover classes={classes} key={3}>
                                      <TableCell style={{ color: currentMode === 'Dark' ? 'white' : 'black', }} component="th" scope="row">
                                        Harry
                                      </TableCell>
                                      <TableCell style={{ color: currentMode === 'Dark' ? 'white' : 'black', }} >Approved</TableCell>
                                      <TableCell style={{ color: currentMode === 'Dark' ? 'white' : 'black', }}>{item.startDate}</TableCell>
                                      <TableCell style={{ color: currentMode === 'Dark' ? 'white' : 'black', }} align="right">
                                        {item.reliever}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow hover classes={classes} key={4}>
                                      <TableCell style={{ color: currentMode === 'Dark' ? 'white' : 'black', }} component="th" scope="row">
                                        Jane
                                      </TableCell>
                                      <TableCell style={{ color: currentMode === 'Dark' ? 'white' : 'black', }} >Pending</TableCell>
                                      <TableCell style={{ color: currentMode === 'Dark' ? 'white' : 'black', }}>{item.startDate}</TableCell>
                                      <TableCell style={{ color: currentMode === 'Dark' ? 'white' : 'black', }} align="right">
                                        {item.reliever}
                                      </TableCell>
                                    </TableRow>

                                  </TableBody>
                                </Table>

                              </Box>

                            </TableCell>

                          }
                        >

                          <TableCell style={{ color: currentMode === 'Dark' ? 'white' : 'black', }} className="text-14">{item.leaveReferenceNumber}</TableCell>
                          <TableCell style={{ color: currentMode === 'Dark' ? 'white' : 'black', }} className="text-14">{item.leaveTypeName.charAt(0).toUpperCase() + item.leaveTypeName.slice(1).toLowerCase()}</TableCell>
                          <TableCell style={{ color: currentMode === 'Dark' ? 'white' : 'black', }} className="text-14">{item.leaveDuration}</TableCell>
                          <TableCell style={{ color: currentMode === 'Dark' ? 'white' : 'black', }} className="text-14">{format(new Date(item.startDate), 'MM/dd/yyyy')}</TableCell>
                          <TableCell style={{ color: currentMode === 'Dark' ? 'white' : 'black', }} className="text-14">{format(new Date(item.endDate), 'MM/dd/yyyy')}</TableCell>
                          <TableCell style={{ color: currentMode === 'Dark' ? 'white' : 'black', }} className="text-14">{item.leaveBalance}</TableCell>
                          <TableCell style={{ color: currentMode === 'Dark' ? 'white' : 'black', }} className="text-14">
                            {item.leaveStatus ? (
                              item.leaveStatus === "Approved" ? (
                                <small className="p-2 hover:drop-shadow-xl hover:bg-light-gray"
                                  style={{ backgroundColor: "green", color: "white", borderRadius: '10px' }}>
                                  {item.leaveStatus}
                                </small>
                              ) : (
                                item.leaveStatus === "Pending Approval" ? (
                                  <small className="p-2 hover:drop-shadow-xl hover:bg-light-gray"
                                    style={{ backgroundColor: "#1A97F5", color: "white", borderRadius: '10px' }}>
                                    {item.leaveStatus}
                                  </small>
                                ) : (<small className="p-2 hover:drop-shadow-xl hover:bg-light-gray"
                                  style={{ backgroundColor: "#orange", color: "white", borderRadius: '10px' }}>
                                  {item.leaveStatus}
                                </small>)
                              )
                            )

                              : (
                                <div className="border-radius-4 bg-primary text-white px-4 py-2px">
                                  Pending Approval
                                </div>
                              )}
                          </TableCell>
                          <TableCell>
                            <Controls.ActionButton
                              color="primary"
                              onClick={() => { openInDialog(item) }}
                            >
                              <EditOutlinedIcon fontSize="small" />
                            </Controls.ActionButton>
                            <Controls.ActionButton
                              color="secondary"
                              onClick={() => { handleDeleteDialog(item) }}
                            >
                              <CloseIcon fontSize="small" />
                            </Controls.ActionButton>
                          </TableCell>

                        </ExpandableTableRow>
                      )
                      )



                    }
                  </TableBody>
                </TblContainer>


                <TablePagination
                  className="px-4"
                  rowsPerPageOptions={[2, 5, 10, 25]}
                  component="div"
                  count={5}
                  style={{ color: currentMode === 'Dark' ? 'white' : 'black', }}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{
                    'aria-label': 'Previous Page',
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'Next Page',
                  }}
                  onPageChange={(e) => handleChangePage(e)}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>



              <LeaveForm
                recordForEdit={recordForEdit}
                openPopup={openPopup}
                addOrEdit={addOrEdit}
                LoadLeaveRequests={GetEmployeeLeaveRequests}
                setOpenPopup={setOpenPopup}
              />

              <Dialog open={openDeletePopup} elevation={3} className={classes.root} >
                <DialogTitle >
                  <div className="flex justify-between items-center text-14 px-0 " >

                    Delete : Leave Request
                    <IconButton
                      aria-label="close"
                      onClick={() => { handleDeleteClose() }}
                      sx={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        color: (theme) => theme.palette.grey[500],
                      }}
                      style={{ marginLeft: 200 }}
                    >
                      <Close />
                    </IconButton>

                  </div>

                </DialogTitle>

                <DialogContent dividers>
                  <div className="flex justify-between items-center px-0 " >
                    <Typography>Delete Leave Request  {recordFordelete ? recordFordelete.leaveTypeName : ""} ({recordFordelete ? recordFordelete.leaveReferenceNumber : ""}) ?</Typography>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button variant="contained" style={{ backgroundColor: '#DC3545' }}><div onClick={() => { DeleteLeaveRequest(recordFordelete.id) }} style={{ color: "white" }}> Yes</div></Button>
                  <Button variant="contained" style={{ backgroundColor: '#1976D2' }} onClick={() => { handleDeleteClose() }}><div style={{ color: "white" }}> No</div></Button>
                </DialogActions>

              </Dialog>


              {/* Material UI grid */}
            </div>

          </div>
  {/* <Footer/>  */}
        </div>
      </div>
    </div>


  );
};

export default Leaves;
