import { createSlice } from '@reduxjs/toolkit'

export const ProfileSlice = createSlice({
name: 'profileuser',
initialState: {
  profile:   
    { 
      id:0,
      idUser:0,
      name: null, 
      lastName: null,
      avatar : null,
      numberPhone:null,
      status: null
    },

},
reducers: {
    profileSuccess: (state, action) => {
    let newProfile = {
        id:action.payload.id,
        idUser:action.payload.idUser,
        name:action.payload.name,
        lastName:action.payload.lastName,
        avatar :action.payload.avatar,
        numberPhone:action.payload.numberPhone,
        status: true
    };
    
    state.profile = newProfile
    
  },
  profileFailure: (state, action) => {
    
    let newProfile = {
        id:0,
        idUser:0,
        name:null,
        lastName:null,
        avatar :null,
        numberPhone:null,
        status:false
    };
    
    state.profile = newProfile
  },
  profileClean: (state, action) => {
    
    let newProfile = {
        id:0,
        idUser:0,
        name:null,
        lastName:null,
        avatar :null,
        numberPhone:null,
        status:null
    };
    
    state.profile = newProfile
  }
  },
})
// Action creators are generated for each case reducer function
export const { profileSuccess, profileFailure, profileClean } = ProfileSlice.actions
export default ProfileSlice.reducer;
