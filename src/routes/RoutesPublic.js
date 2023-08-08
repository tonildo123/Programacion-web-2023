import Login from "../pages/login";
import { Navigate, Route, Routes } from 'react-router-dom';

const RoutesPublic = () => (

    <Routes>
        <Route path='login' element={<Login />} />
        <Route path='*' element={<Navigate to='/login' replace />} />
    </Routes>
);

export default RoutesPublic;  