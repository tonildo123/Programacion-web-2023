import Login from "../pages/login";
import { Navigate, Route, Routes } from 'react-router-dom';
import Register from "../pages/register";
import ForgotPassword from "../pages/forgotpassword";
import TermsAndConditions from "../pages/terminos_y_condiciones";

const RoutesPublic = () => (

    <Routes>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='forgotpassword' element={<ForgotPassword />} />
        <Route path='termsandconditions' element={<TermsAndConditions />} />
        <Route path='*' element={<Navigate to='/login' replace />} />
    </Routes>
);

export default RoutesPublic;  