import Home from "../pages/home";
import { Route, Routes, Navigate } from 'react-router-dom';

const RoutesPrivate = () => (

    <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='*' element={<Navigate to='/home' replace />} />
    </Routes>

);

export default RoutesPrivate;  