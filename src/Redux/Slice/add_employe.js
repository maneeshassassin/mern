import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 value:{
    name:undefined,
    email:undefined,
    Phone:undefined,
    DOB:undefined,
    DOE:undefined,
    city:undefined,
    zip:undefined,
    address_line:undefined,
    isDelete:false,
    emp_data:[]
 }
}

export const add_emp_slice = createSlice({
  name: 'emp',
  initialState,
  reducers: {
    name: (state, action) => {
        state.value.name = action.payload
      },
      email: (state, action) => {
        state.value.email = action.payload
      },
      Phone: (state, action) => {
        state.value.Phone = action.payload
      },
      DOB: (state, action) => {
        state.value.DOB = action.payload
      },
      DOE: (state, action) => {
        state.value.DOE = action.payload
      },
      city: (state, action) => {
        state.value.city = action.payload
      },
      zip: (state, action) => {
        state.value.zip = action.payload
      },
      address_line: (state, action) => {
        state.value.address_line = action.payload
      },
      isDelete: (state, action) => {
        state.value.isDelete = action.payload
      },
      emp_data: (state, action) => {
        state.value.emp_data = action.payload
      },
  },
})

// Action creators are generated for each case reducer function
export const { name,email,Phone ,DOB,DOE,city,zip,address_line,isDelete,emp_data} = add_emp_slice.actions

export default add_emp_slice.reducer