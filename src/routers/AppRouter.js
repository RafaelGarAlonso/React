import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../components/LoginPage/LoginPage';
import { Dashboard } from '../components/Dashboard/Dashboard';

export const AppRouter = () => {
    const [token, setToken] = useState();

    if(!token) {
        return <LoginPage setToken={setToken} />
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/dashboard">
                    <Dashboard />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
