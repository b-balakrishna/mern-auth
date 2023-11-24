import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './pages/Navbar';
import { useSelector } from 'react-redux';
import routes from './routes/routes';
import Loader from './common/Loader';
import RouteComponent from './routes/RouteComponent';

const App = () => {
    const { currentUser } = useSelector((state) => state.user);
    return (
        <BrowserRouter>
            <Navbar currentUser={currentUser} />
            <Suspense fallback={<Loader />}>
                <Routes>
                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <RouteComponent
                                    route={route}
                                    currentUser={currentUser}
                                />
                            }
                        />
                    ))}
                </Routes>
            </Suspense>
            <Toaster />
        </BrowserRouter>
    );
};

export default App;
