import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaUser } from 'react-icons/fa';
import { useUser } from '../context/UserContext';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, searchTerm, setSearchTerm } = useUser();

    const handleHomeClick = () => {
        navigate('/restaurants');
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    return (
        <header className="header">
            <div className="header-left">
                <FaHome onClick={handleHomeClick} className="icon" color="#EA1D2C" />
            </div>
            <div className="header-center">
                {location.pathname === '/restaurants' && (
                    <input
                        type="text"
                        placeholder="Procure por restaurantes ou pratos..."
                        className="search-bar"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                )}
            </div>
            <div className="header-right">
                <span>Olá, {user?.username || 'Convidado'}!</span>
                <FaUser onClick={handleProfileClick} className="icon" color="#EA1D2C" />
            </div>
        </header>
    );
};

export default Header;