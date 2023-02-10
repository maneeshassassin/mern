import { configureStore } from '@reduxjs/toolkit'
import add_emp_slice from './Slice/add_employe';
import toUpdateSlice from './Slice/to_update'
import update_emp_slice from './Slice/update_emp'
export const store = configureStore({
  reducer: {
    add_emp_slice,
    toUpdateSlice,
    update_emp_slice
  },
})