// frontend/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import RestaurantList from './pages/RestaurantList';
import RestaurantDetails from './pages/RestaurantDetails';
import { UserProvider } from './context/UserContext';

const App: React.FC = () => {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/restaurants/:id" element={<RestaurantDetails />} />
                    <Route path="/restaurants" element={<RestaurantList />} />
                    <Route path="/" element={<Login />} />
                </Routes>
            </Router>
        </UserProvider>
    );
};

export default App;