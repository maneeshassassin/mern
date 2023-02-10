import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import {useDispatch,useSelector} from 'react-redux';
import { name,email,Phone ,DOB,DOE,city,zip,address_line,isDelete,emp_data} from '../Redux/Slice/add_employe'
import Stack from '@mui/material/Stack';
import { api_instance } from '../api';
import Tables from './Tables';
import Archives from './Archives';
import '../App.css'
export let get_emp_api;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxHeight: 450,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow:'auto'
};

export default function Main() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
const[page,setPage]=React.useState(1)
  const state=useSelector(state=>state.add_emp_slice.value);
  
console.log(state);
  const dispatch=useDispatch();

var data = JSON.stringify({
      "email": state.email,
      "address.city": state.city,
      "name": state.name,
        "phone":state.Phone,
        "DOB":state.DOB,
        "DOE":state.DOE,
        "address.zip_code":state.zip,
        "address.address_line":state.address_line,
        "isDelete":false
    });
const add_emp_api=()=>{
        api_instance
        .post('/api/add-employee', data)
        .then((response) => {
          console.log(response.data);
          if(response){
            get_emp_api()
            handleClose();
          }
        })
        .catch((error) => {
          console.log(error);
        });
}
 get_emp_api=(pages)=>{
    api_instance
    .get(`/api/get-employee?page=${pages}&limit=4`)
    .then((response) => {
      console.log(response.data);
      if(response){
        dispatch(emp_data(response.data))
        setPage(response.data.data.next.page)
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
React.useEffect(()=>{
    get_emp_api()
},[])



  return (
    <div style={{paddingTop:'30px',}} className='container ' >
        <div className="row">
            <div className="col-10 mx-auto">

           
        <div className='text-end'>
    <div className='py-3 fw-bold fs-3 text-center text-white'>EMPLOYEE DATABASE</div>
      </div>
        <div className='d-flex px-2 py-2 ' style={{justifyContent:'end'}}>
      <Button variant="contained" className='text-end me-2' onClick={handleOpen}>Add Employee</Button>
      <Archives/>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
        <div className='text-center'>
        <span className=' text-primary pb-1 brdr'>Add Employees</span>
        </div>

      <TextField id="filled-Email" label="Email"  variant="filled" value={state.email } onChange={(e)=>dispatch(email(e.target.value))} />
      <TextField id="filled-Name" label="Name" variant="filled" value={state.name}  onChange={(e)=>dispatch(name(e.target.value))} />
      <TextField id="filled-Phone" label="Phone" variant="filled" value={state.Phone}  onChange={(e)=>dispatch(Phone(e.target.value))}/>
      <TextField id="filled-DOB" type='date' label="DOB" variant="filled" value={state.DOB}  onChange={(e)=>dispatch(DOB(e.target.value))}/>
      <TextField id="filled-DOE" type='date' label="DOE" variant="filled" value={state.DOE}  onChange={(e)=>dispatch(DOE(e.target.value))}/>
      <TextField id="filled-City" label="City" variant="filled" value={state.city}  onChange={(e)=>dispatch(city(e.target.value))}/>
      <TextField id="filled-Zip" label="Zip Code" variant="filled" type='number' value={state.zip}  onChange={(e)=>dispatch(zip(e.target.value))}/>
      <TextField id="filled-Address" label="Address line*" variant="filled" value={state.address_line}  onChange={(e)=>dispatch(address_line(e.target.value))}/>
      <div className='text-center pt-2'>
      <Button variant="contained" onClick={add_emp_api}>CREATE</Button>
      </div>


    </Box>
          </Typography>
        </Box>
      </Modal>
      <Tables/>
      </div>
        </div>
    </div>
  );
}
