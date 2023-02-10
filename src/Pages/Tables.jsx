import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.css';
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { api_instance } from '../api';
import {get_emp_api} from '../Pages/Main'
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { to_update_action } from '../Redux/Slice/to_update';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import '../App.css'
import { name,email,Phone ,DOB,DOE,city,zip,address_line,isDelete,emp_data} from '../Redux/Slice/update_emp'
import { get_arch_api } from './Archives';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
const Tables = () => {
    const state=useSelector(state=>state.update_emp_slice.value)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // const [page, setPage] = React.useState(1);
    

    const[employee,setEmployee]=useState('')
    const data=useSelector(state=>state.add_emp_slice.value);
console.log(data?.emp_data?.data?.next?.page)
    console.log(employee)
    const dispatch=useDispatch()
    const delete_api=(id)=>{
        api_instance
        .patch(`/api/delete-employee/${id}`, )
        .then((response) => {
          console.log(response.data);
          if(response){
            get_emp_api();
            get_arch_api();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    useEffect(()=>{
        dispatch(to_update_action(employee))
    },[employee])

    var datas = JSON.stringify({
        "email": state.email ?? employee.email,
        "address.city": state.city ?? employee.city,
        "name": state.name ?? employee.name,
          "phone":state.Phone ?? employee.Phone,
          "DOB":state.DOB ?? employee.DOB,
          "DOE":state.DOE ?? employee.DOE,
          "address.zip_code":state.zip ?? employee.zip,
          "address.address_line":state.address_line ?? employee.address_line,
          "isDelete":false
      });

    const update_emp_api=()=>{
        api_instance
        .post(`/api/update-employee/${employee.id}`, datas)
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
  return (
    <div>
    <div className='container'>
        <div className="row">
            <div className="col-12 mx-auto overflow-auto"  >
            <Table striped bordered hover variant="dark" >
      <thead className=''>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>DOB</th>
          <th>DOE</th>
          <th>City</th>
          <th>Zip Code</th>
          <th>Address Line</th>
          <th>Created At</th>
          <th>Actions</th>

        </tr>
      </thead>
      <tbody>
        {
         data?.emp_data?.data?.results && data?.emp_data?.data?.results.map((item,index)=>{
            return  <tr>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{moment(item.DOB).format('DD-MM-YYYY')}</td>
            <td>{moment(item.DOE).format('DD-MM-YYYY')}</td>
            <td>{item.address.city}</td>
            <td>{item.address.zip_code}</td>
            <td>{item.address.address_line}</td>
            <td>{moment(item.createdAt).fromNow()}</td>
            <td><span onClick={()=>{setEmployee({
                    name:item.name,
                    email:item.email,
                    Phone:item.phone,
                    DOB:item?.DOB,
                    DOE:item?.DOE,
                    city:item.address.city,
                    zip:item.address.zip_code,
                    address_line:item.address.address_line,
                    id:item?._id
            });handleOpen()}} ><AiFillEdit/></span><span className='ms-2 text-danger' onClick={()=>delete_api(item._id)}><MdDelete/></span></td>
          </tr>
         })   
        }
      </tbody>
    </Table>
    <div className='align_np'>
    <Button variant='contained' className='me-2' onClick={()=>get_emp_api(data?.emp_data?.data?.next?.page)}>Prev</Button>
    <Button variant='contained' onClick={()=>get_emp_api(data?.emp_data?.data?.next?.page)}>Next</Button>
    </div>
            </div>
        </div>
    </div>
    <div>
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
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
       <TextField id="filled-Email" label="Email"  variant="standard" value={state.email ?? employee.email } onChange={(e)=>dispatch(email(e.target.value))} />
      <TextField id="filled-Name" label="Name" variant="standard" value={state.name ?? employee.name}  onChange={(e)=>dispatch(name(e.target.value))} />
      <TextField id="filled-Phone" label="Phone" variant="standard" value={state.Phone ?? employee.Phone}  onChange={(e)=>dispatch(Phone(e.target.value))}/>
      <TextField id="filled-DOB" type='date' label="DOB" variant="standard" value={state.DOB ?? moment(employee.DOB).format("YYYY-MM-DD")}  onChange={(e)=>dispatch(DOB(e.target.value))}/>
      <TextField id="filled-DOE" type='date' label="DOE" variant="standard" value={state.DOE ?? employee.DOE}  onChange={(e)=>dispatch(DOE(e.target.value))}/>
      <TextField id="filled-City" label="City" variant="standard" value={state.city ?? employee.city}  onChange={(e)=>dispatch(city(e.target.value))}/>
      <TextField id="filled-Zip" label="Zip Code" variant="standard" type='number' value={state.zip ?? employee.zip}  onChange={(e)=>dispatch(zip(e.target.value))}/>
      <TextField id="filled-Address" label="Address line*" variant="standard" value={state.address_line ?? employee.address_line}  onChange={(e)=>dispatch(address_line(e.target.value))}/>
      <div className='text-center pt-2'>
      <Button variant="contained" onClick={update_emp_api}>UPDATE</Button>
      </div>

    </Box>
          </Typography>
        </Box>
      </Modal>
    </div>
    </div>
  )
}

export default Tables