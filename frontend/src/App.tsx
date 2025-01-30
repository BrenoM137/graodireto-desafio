// frontend/src/App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import RestaurantList from './pages/RestaurantList';
import RestaurantDetails from './pages/RestaurantDetails';
import { UserProvider } from './context/UserContext';
import Profile from './pages/Profile'

const App: React.FC = () => {
    useEffect(() => {
        document.title = 'Desafio Grão Direto MVP';
    }, []);
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/restaurants/:id" element={<RestaurantDetails />} />
                    <Route path="/restaurants" element={<RestaurantList />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </Router>
        </UserProvider>
    );
};

export default App;