import { createSlice } from '@reduxjs/toolkit'

export const OwnSlice = createSlice({
name: 'ownuser',
initialState: {
  own:   
    { 
      id:0,
      idUser:0,
      object:null,
      photo:null,
      status: null
    },

},
reducers: {
    ownSuccess: (state, action) => {
    let newOwn = {
        id:action.payload.id,
        idUser:action.payload.idUser,
        object:action.payload.object,
        photo:action.payload.photo,
        status: true
    };
    
    state.own = newOwn
    
  },
  ownFailure: (state, action) => {
    
    let newOwn = {
        id:0,
        idUser:0,
        object:null,
        photo:null,
        status:false
    };
    
    state.own = newOwn
  },
  ownClean: (state, action) => {
    
    let newOwn = {
        id:0,
        idUser:0,
        object:null,
        photo:null,
        status:null
    };
    
    state.own = newOwn
  },
  ownState: (state, action) => {
    
    let newOwn = {
        id:0,
        idUser:action.payload.idUser,
        object:action.payload.object,
        photo:null,
        status:null
    };
    
    state.own = newOwn
  }
  },
})
// Action creators are generated for each case reducer function
export const { ownSuccess, ownFailure, ownClean,ownState } = OwnSlice.actions
export default OwnSlice.reducer;
