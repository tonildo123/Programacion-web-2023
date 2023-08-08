import { createSlice } from '@reduxjs/toolkit'

export const AddressSlice = createSlice({
name: 'addressuser',
initialState: {
  address:   
    { 
      id:0,
      idUser:0,
      street:null,
      number:null,
      department:null,
      floor:null,
      locality:null,
      province:null,
      country:null,
      latitude:null,
      longitude:null,
      success : null
    },

},
reducers: {
  addressSuccess: (state, action) => {
    let newAddress = {
      id:action.payload.id,
      idUser:action.payload.idUser,
      street:action.payload.street,
      number:action.payload.number,
      department:action.payload.department,
      floor:action.payload.floor,
      locality:action.payload.locality,
      province:action.payload.province,
      country:action.payload.country,
      latitude:action.payload.latitude,
      longitude:action.payload.longitude,
      success : true
    };
    
    state.address = newAddress
    
  },
  addressFailure: (state, action) => {
    
    let newAddress = {
        id:0,
        idUser:0,
        street:null,
        number:null,
        department:null,
        floor:null,
        locality:null,
        province:null,
        country:null,
        latitude:null,
        longitude:null,
        success : false
      };
      
      state.address = newAddress
  },
  addressClean: (state, action) => {
    
    let newAddress = {
        id:0,
        idUser:0,
        street:null,
        number:null,
        department:null,
        floor:null,
        locality:null,
        province:null,
        country:null,
        latitude:null,
        longitude:null,
        success : null
      };
      
      state.address = newAddress
  }
  },
})
// Action creators are generated for each case reducer function
export const { addressSuccess, addressFailure, addressClean } = AddressSlice.actions
export default AddressSlice.reducer;
