import { createSlice } from '@reduxjs/toolkit'

export const ArrayPetSlice = createSlice({
name: 'userPetsArray',
initialState: {
  pets: []
},
reducers: {
    petArraySuccess: (state, action) => {
        // Agrega la nueva mascota al array de mascotas del usuario
        state.pets.push({
          id: action.payload.id,
          idUser: action.payload.idUser,
          pickname: action.payload.pickname,
          photo: action.payload.photo,
          status: true,
        });
      },
  petArrayFailure: (state, action) => {
    
    return state
  }, 
  petArrayClean: (state, action) => {
    
    state.pets = [];
  },
  petArrayRemove: (state, action) => {
    const idToRemove = action.payload;
    state.pets = state.pets.filter((pet) => pet.id !== idToRemove);
  }
  },
})
// Action creators are generated for each case reducer function
export const { petArraySuccess, petArrayFailure, petArrayClean, petArrayRemove } = ArrayPetSlice.actions
export default ArrayPetSlice.reducer;
