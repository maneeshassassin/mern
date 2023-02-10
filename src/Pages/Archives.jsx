import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Table from 'react-bootstrap/Table';
import { api_instance } from '../api';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css';

export let get_arch_api;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow:'auto'
};

export default function Archives() {
  const [open, setOpen] = React.useState(false);
  const [archive, setArchives] = React.useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  get_arch_api=()=>{
    api_instance
    .get('/api/deleted-employee',)
    .then((response) => {
      console.log(response.data);
      if(response){
        setArchives(response.data.data)
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
React.useEffect(()=>{
    get_arch_api()
},[])

  return (
    <div>
      <Button onClick={handleOpen} variant='contained'>Archives</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <h4 className='text-center py-2 text-danger'>Deleted Employees</h4>
          <Table striped bordered hover>
      <thead>
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
        </tr>
      </thead>
      <tbody>
        {
            archive && archive?.map((item,index)=>{
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
            </tr>
            })
        }
      </tbody>
    </Table>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}