import { createSlice } from '@reduxjs/toolkit'

export const PetSlice = createSlice({
name: 'petuser',
initialState: {
  pet:   
    { 
      id:0,
      idUser:0,
      pickname:null,
      photo:null,
      status: null
    },

},
reducers: {
    petSuccess: (state, action) => {
    let newPet = {
        id:action.payload.id,
        idUser:action.payload.idUser,
        pickname:action.payload.pickname,
        photo:action.payload.photo,
        status: true
    };
    
    state.pet = newPet
    
  },
  petFailure: (state, action) => {
    
    let newPet = {
        id:0,
        idUser:0,
        pickname:null,
        photo:null,
        status:false
    };
    
    state.pet = newPet
  }, 
  petClean: (state, action) => {
    
    let newPet = {
        id:0,
        idUser:0,
        pickname:null,
        photo:null,
        status:null
    };
    
    state.pet = newPet
  }
  },
})
// Action creators are generated for each case reducer function
export const { petSuccess, petFailure, petClean } = PetSlice.actions
export default PetSlice.reducer;
