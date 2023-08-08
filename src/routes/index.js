import { useSelector } from 'react-redux';
import RoutesPrivate from './RoutesPrivate';
import RoutesPublic from './RoutesPublic';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


const RouterApp = () => {
    const { logged } = useSelector(state => state.logger.user);

    return (

        <BrowserRouter>
            <Routes>
                {
                    logged
                        ? <Route path="/*" element={<RoutesPrivate />} />
                        : <Route path="/*" element={<RoutesPublic />} />
                }

                <Route path='*' element={<Navigate to='/login' replace />} />
            </Routes>
        </BrowserRouter>
    )
};


export default RouterApp;
