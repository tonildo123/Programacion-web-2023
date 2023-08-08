import { createSlice } from '@reduxjs/toolkit'

export const HCSlice = createSlice({
name: 'hcuser',
initialState: {
  hc:   
    { 
      id:0,
      idUser:0,
      photo:null,
      status: null
    },

},
reducers: {
    hcSuccess: (state, action) => {
    let newHC = {
        id:action.payload.id,
        idUser:action.payload.idUser,
        photo:action.payload.photo,
        status: true
    };
    
    state.owhcn = newHC
    
  },
  hcFailure: (state, action) => {
    
    let newHC = {
        id:0,
        idUser:0,
        photo:null,
        status:false
    };
    
    state.hc = newHC
  },
  hcClean: (state, action) => {
    
    let newHC = {
        id:0,
        idUser:0,
        photo:null,
        status:null
    };
    
    state.hc = newHC
  }
  },
})
// Action creators are generated for each case reducer function
export const { hcSuccess, hcFailure, hcClean } = HCSlice.actions
export default HCSlice.reducer;
