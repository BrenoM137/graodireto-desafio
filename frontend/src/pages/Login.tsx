import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Register from './Register';
import api from '../services/api';
import mouthImage from '../assets/mouth.png';
import { useUser } from '../context/UserContext';
import { LoginResponse } from '../types/apiResponses';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showRegister, setShowRegister] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setUser, setToken } = useUser();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post<LoginResponse>('/auth/login', { email, password });
            const { user, token } = response.data;
            setUser(user);
            setToken(token);
            localStorage.setItem('userId', user._id);
            localStorage.setItem('token', token);
            navigate('/restaurants');
        } catch (error: any) {
            setError(error.response.data.msg || 'Email ou senha incorretos!');
        }
    };

    return (
        <div className="login-page">
            <div className="container">
                <div className="main-text">
                    <h1>Quem tem boca</h1>
                    <img src={mouthImage} height={'150px'} width={'150px'} alt="Mouth"/>
                </div>
                <div className="login">
                    {showRegister ? (
                        <Register />
                    ) : (
                        <form onSubmit={handleSubmit}>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <div>
                                <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div>
                                <input type="password" id="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <button type="submit">Login</button>
                            <div className="bottom-text">
                                <span>Ainda não tem uma conta? <a href="#" onClick={() => setShowRegister(true)}>Clique aqui</a></span>
                            </div>
                        </form>
                    )}
                    {showRegister && (
                        <div className="bottom-text">
                            <span>Já tem uma conta? <a href="#" onClick={() => setShowRegister(false)}>Clique aqui</a></span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;