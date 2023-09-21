import { useSelector } from 'react-redux';
import RoutesPrivate from './RoutesPrivate';
import RoutesPublic from './RoutesPublic';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


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
                </Routes>
        </BrowserRouter>
    )
};


export default RouterApp;
