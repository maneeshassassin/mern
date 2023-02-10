import { createSlice } from '@reduxjs/toolkit';


const initialState = {
value:''
}

export const toUpdateSlice = createSlice({
  name: 'emp',
  initialState,
  reducers: {
    to_update_action: (state, action) => {
        state.value = action.payload
      },
  },
})

// Action creators are generated for each case reducer function
export const { to_update_action} = toUpdateSlice.actions

export default toUpdateSlice.reducer