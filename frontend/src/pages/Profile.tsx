import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Profile: React.FC = () => {
    const { user, setUser, setToken } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null as any); // Ajuste para evitar erro de tipo
        setToken('');
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        navigate('/');
    };

    if (!user) {
        return <div>ERRO!</div>;
    }

    return (
        <div className="profile-details-page">
            <Header/>
            <div className="main-content">
                <div className="profile-details">
                    <h1>Perfil</h1>
                    <div className="profile-details-info">
                        <p><strong>Nome:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Endereço:</strong> {user.address}</p>
                        <p><strong>Telefone:</strong> {user.phone}</p>
                    </div>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Profile;