import React, { useEffect, useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Navbar, Footer, Sidebar, ThemeSettings } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import Api from "../contexts/Api"
import SetCookie from '../../src/Hooks/SetCookie';
import GetCookie from '../../src/Hooks/GetCookie';
import { GridComponent,Search,ExcelExport,Group, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { useToasts } from "react-toast-notifications";
import { customersData, customersGrid } from '../data/dummy';
import { Header } from '../components';

//material UI grid
import {Grid,Dialog, DialogActions, ButtonGroup, DialogContent,  DialogTitle, Typography } from '@material-ui/core';
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
      minHeight: 800
  },
  pageContent: {
      margin: theme.spacing(3),
      padding: theme.spacing(0),
      background: '#FAFAFA',
  },
  searchInput: {
      width: '75%'
  },
  newButton: {
      position: 'absolute',
      right: '10px'
  },
  tableHeadExpand: {
      background: '#F5F5F5'
  },

}))


const headCells = [
  { id: 'expand', label: ' ' },
  { id: 'leaveReferenceNumber', label: 'leave Ref.No.' },
  { id: 'leaveType', label: 'Leave Type' },
  { id: 'duration', label: 'Leave Duration' },
  { id: 'leaveStart', label: 'Leave Start' },
  { id: 'leaveEnd', label: 'Leave End' },
  { id: 'reliever', label: 'Reliever' },
  { id: 'leaveBalance', label: 'Leave Balance' },
  { id: 'leaveStatus', label: 'Leave Status' },
  { id: 'actions', label: 'Actions', disableSorting: true }
]


const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);


  return (
      <>
          <TableRow {...otherProps}>
              <TableCell padding="checkbox">
                  <IconButton onClick={() => setIsExpanded(!isExpanded)}>
                      {isExpanded ? <Remove /> : <Add />}
                  </IconButton>
              </TableCell>
              {children}
          </TableRow>
          {isExpanded && (
              <TableRow>
                  <TableCell padding="checkbox" />
                  {expandComponent}
              </TableRow>
          )}
      </>
  );
};


const Leaves = () => {
  const [employeeleaveRequests, setEmployeeleaveRequests] = useState();
  const {isLoggedIn, setIsLoggedIn, setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  

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
        if(responseCode.success == true){
            addToast(responseCode.message, { appearance: 'success' }); 
            setOpenDeletePopup(false)
        }else{
            addToast(responseCode.errorMessage, { appearance: 'error' }); 
            setOpenDeletePopup(false) 
        }
        GetEmployeeLeaveRequests()
    })
  }
  const handleDeleteDialog = (item) =>{
      setRecordForDelete(item)
      setOpenDeletePopup(true)
      console.log(recordFordelete);
  }

  const handleDeleteClose = () =>{
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
    if(currentLoginStatus){
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
   //  console.log(data);
       setEmployeeleaveRequests(data);
       setGridData(data);
      });
  }
  

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


          <div>
       


<Paper className={classes.pageContent}>

<div >

            <Grid container spacing={3} className="mb-6">
            <Grid item xs={12} md={6}>
              
                   
            <div >
      <div style={{ textAlign: 'center' }}>
        <p className="text-18" style={{ fontWeight: 600 }}>Period : 2020 / 2021 FY</p>
      </div>

      <TableContainer style={{ paddingLeft: 20, paddingRight: 20, width: '100%', height:300 }} >
        <Table  aria-label="collapsible table" style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 0, paddingTop: 20,  border: '1px solid rgba(224, 224, 224, 1)' }}  >
          <TableHead  >
            <TableRow >
              <TableCell></TableCell>
              <TableCell className="text-14" style={{ fontWeight: 600, paddingLeft: 20, border: '1px solid rgba(224, 224, 224, 1)' }} >Carry Forward</TableCell>
              <TableCell className="text-14" style={{ fontWeight: 600, paddingLeft: 20, border: '1px solid rgba(224, 224, 224, 1)' }} >Annual Entitlement</TableCell>
              <TableCell className="text-14" style={{ fontWeight: 600, paddingLeft: 20, border: '1px solid rgba(224, 224, 224, 1)' }}> Leave Balance</TableCell>

            </TableRow>
          </TableHead>
          <TableBody >
            {
              LeaveTypeData.map(
                (item, i) => (
                  <TableRow key={i} >
                    <TableCell className="text-14" style={{ fontWeight: 600, paddingLeft: 20, border: '1px solid rgba(224, 224, 224, 1)' }}>{item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()}</TableCell>
                    <TableCell align='center' > {item.carryForwardValue} days</TableCell>
                    <TableCell align='center' style={{ border: '1px solid rgba(224, 224, 224, 1)' }} >{item.entitlementDuration} days</TableCell>
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

                  <div className="flex justify-center items-center">
                  
                  <ButtonGroup variant="contained">
                  <Button className="bg-primary text-white" size="large" >Current Status</Button>
                   <Button  className="bg-secondary text-white" size="large">On Leave | End Date : 12/11/2021</Button>
                  </ButtonGroup>

                  </div>
             
            </Grid>
            
        </Grid>
        </div>

<Toolbar>

    <Controls.Button
        text=" Raise New Leave Request"
        variant="contained"
        startIcon={<AddIcon />}
        className={classes.newButton}
        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
    />
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


                        <TableCell style={{ paddingBottom: 0, paddingTop: 0, paddingLeft: 130 }} colSpan={6}>

                            <Box >

                                <Table size="small" aria-label="note" className={classes.tableHeadExpand} >
                                    <TableHead >
                                        <TableRow>
                                            <TableCell >Approver</TableCell>
                                            <TableCell>Action</TableCell>
                                            <TableCell >Date</TableCell>
                                            <TableCell >Remarks</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        <TableRow key={2}>
                                            <TableCell component="th" scope="row">
                                                Elius
                                            </TableCell>
                                            <TableCell >Pending</TableCell>
                                            <TableCell>{item.startDate}</TableCell>
                                            <TableCell align="right">
                                                {item.reliever}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key={3}>
                                            <TableCell component="th" scope="row">
                                                Harry
                                            </TableCell>
                                            <TableCell >Approved</TableCell>
                                            <TableCell>{item.startDate}</TableCell>
                                            <TableCell align="right">
                                                {item.reliever}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key={4}>
                                            <TableCell component="th" scope="row">
                                                Jane
                                            </TableCell>
                                            <TableCell >Pending</TableCell>
                                            <TableCell>{item.startDate}</TableCell>
                                            <TableCell align="right">
                                                {item.reliever}
                                            </TableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>

                            </Box>

                        </TableCell>

                    }
                >

                    <TableCell className="text-14">{item.number}</TableCell>
                    <TableCell className="text-14">{item.leaveTypeName.charAt(0).toUpperCase() + item.leaveTypeName.slice(1).toLowerCase()}</TableCell>
                    <TableCell className="text-14">{item.leaveDuration}</TableCell>
                    <TableCell className="text-14">{format(new Date(item.startDate), 'MM/dd/yyyy')}</TableCell>
                    <TableCell className="text-14">{format(new Date(item.endDate), 'MM/dd/yyyy')}</TableCell>
                    <TableCell className="text-14">{item.reliever}</TableCell>
                    <TableCell className="text-14">{item.leaveBalance}</TableCell>
                    <TableCell className="text-14">
                        {item.leaveStatus ? (
                            item.leaveStatus == "Approved" ? (
                                <small className="border-radius-4 bg-green text-white px-4 py-2px">
                                    {item.leaveStatus}
                                </small>
                            ) : (
                                item.leaveStatus == "Pending Approval" ? (
                                    <small className="border-radius-4 bg-primary text-white px-4 py-2px">
                                        {item.leaveStatus}
                                    </small>
                                ) : (<small className="border-radius-4 bg-error text-white px-4 py-2px">
                                    {item.leaveStatus}
                                </small>)
                            )
                        )

                            : (
                                <small className="border-radius-4 bg-primary text-white px-4 py-2px">
                                    Pending Approval
                                </small>
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
                            onClick={()=>{handleDeleteDialog(item)}}
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
    count={gridData.length}
    rowsPerPage={rowsPerPage}
    page={page}
    backIconButtonProps={{
        'aria-label': 'Previous Page',
    }}
    nextIconButtonProps={{
        'aria-label': 'Next Page',
    }}
    onChangePage={(e) => handleChangePage(e)}
    onChangeRowsPerPage={handleChangeRowsPerPage}
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
            onClick={()=>{handleDeleteClose()}}
            sx={{
                position: 'absolute',
                right: 0,
                top: 0,
                color: (theme) => theme.palette.grey[500],
            }}
            style={{marginLeft:200}}
        >
            <Close />
        </IconButton>

    </div>

</DialogTitle>

<DialogContent  dividers>
    <div className="flex justify-between items-center px-0 " >
        <Typography>Delete Leave Request  {recordFordelete?  recordFordelete.leaveTypeName :""} ({recordFordelete?  recordFordelete.leaveReferenceNumber :""}) ?</Typography>
    </div>
</DialogContent>
<DialogActions>
    <Button variant="contained" style={{backgroundColor:'#DC3545'}}><div onClick={() =>{DeleteLeaveRequest(recordFordelete.id)}} style={{color:"white"}}> Yes</div></Button>
    <Button variant="contained" style={{backgroundColor:'#1976D2'}}  onClick={()=>{handleDeleteClose()}}><div style={{color:"white"}}> No</div></Button>  
</DialogActions>

</Dialog>


     {/* Material UI grid */}
     </div>

        </div>
     
      </div>
    </div>
</div>

    
  );
};

export default Leaves;
