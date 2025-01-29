import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Register from './Register';
import api from '../services/api';
import { useUser } from '../context/UserContext';
import { LoginResponse } from '../types/apiResponses';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showRegister, setShowRegister] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setUserName, setToken } = useUser();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post<LoginResponse>('/auth/login', { email, password });
            setUserName(response.data.userName);
            setToken(response.data.token);
            navigate('/restaurants');
        } catch (error: any) {
            setError(error.response.data.msg || 'Email ou senha incorretos!');
        }
    };

    return (
        <div className="container">
            <div className="right">
                <div className="main-text">
                    <h1>Quem tem boca</h1>
                    <img src="../assets/mouth.png" alt="Mouth" />
                </div>
                <div className="top-right">
                    {showRegister ? (
                        <span>Já tem uma conta? <a href="#" onClick={() => setShowRegister(false)}>Clique aqui</a></span>
                    ) : (
                        <span>Ainda não tem uma conta? <a href="#" onClick={() => setShowRegister(true)}>Clique aqui</a></span>
                    )}
                </div>
                {showRegister ? (
                    <Register />
                ) : (
                    <form onSubmit={handleSubmit}>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <div>
                            <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div>
                            <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;