import Home from "../pages/home";
import { Route, Routes, Navigate } from 'react-router-dom';
import Create from "../pages/pets/createPets";
import Edit from "../pages/pets";
import Profile from "../pages/profile";
import Owns from "../pages/owns";
import HC from "../pages/hc";
import Nosotros from "../pages/nosostros";

const RoutesPrivate = () => (

    <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/pets/create' element={<Create />} />
        <Route path='/pets/edit' element={<Edit />} />
        <Route path='/profile/owns' element={<Owns />} />
        <Route path='/profile/edit' element={<Profile />} />
        <Route path='/pets/hc' element={<HC />} />
        <Route path='/nosotros' element={<Nosotros />} />
        <Route path='*' element={<Navigate to='/home' replace />} />
    </Routes>

);

export default RoutesPrivate;  