import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import RestaurantList from './components/RestaurantList';
import RestaurantDetails from './components/RestaurantDetails';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/restaurants/:id" element={<RestaurantDetails />} />
                <Route path="/restaurants" element={<RestaurantList />} />
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;