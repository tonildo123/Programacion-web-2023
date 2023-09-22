import { configureStore } from '@reduxjs/toolkit'
import LoginSlice from './LoginSlice'
import ProfileSlice from './Profileslice'
import AddressSlice from './AddressSlice'
import PetSlice from './PetSlice'
import OwnSlice from './OwnSlice'
import HCSlice  from './ClinicalSlice'
import ArrayPetSlice from './ArrayPetSlice'


export const store = configureStore({
  reducer: {
    logger: LoginSlice,
    profileuser: ProfileSlice,
    addressuser: AddressSlice,
    petuser: PetSlice,
    userPetsArray: ArrayPetSlice,
    ownuser: OwnSlice,
    hcuser: HCSlice,    
  },
})