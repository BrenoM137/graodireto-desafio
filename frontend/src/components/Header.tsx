// frontend/src/components/Header.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUser } from 'react-icons/fa';
import { useUser } from '../context/UserContext';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const { userName, searchTerm, setSearchTerm } = useUser();

    const handleHomeClick = () => {
        navigate('/restaurants');
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    return (
        <header className="header">
            <div className="header-left">
                <FaHome onClick={handleHomeClick} className="icon" />
            </div>
            <div className="header-center">
                <input
                    type="text"
                    placeholder="Pesquise por restaurantes ou pratos..."
                    className="search-bar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="header-right">
                <span>Olá, {userName || 'Visitante'}!</span>
                <FaUser onClick={handleProfileClick} className="icon" />
            </div>
        </header>
    );
};

export default Header;