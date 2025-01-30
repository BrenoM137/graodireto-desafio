import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useUser } from '../context/UserContext';
import { LoginResponse } from '../types/apiResponses';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setUser, setToken } = useUser();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('As senhas devem ser iguais!');
            return;
        }
        try {
            await api.post('/auth/register', { username: name, email, address, phone, password, confirmpassword: confirmPassword });
            const loginResponse = await api.post<LoginResponse>('/auth/login', { email, password });
            const { user, token } = loginResponse.data;
            setUser(user);
            setToken(token);
            localStorage.setItem('userId', user._id);
            localStorage.setItem('token', token);
            navigate('/restaurants');
        } catch (error: any) {
            setError(error.response.data.msg || 'Falha no registro!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <input type="text" id="name" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <input type="text" id="address" placeholder="Endereço" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
            <div>
                <input type="text" id="phone" placeholder="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div>
                <input type="password" id="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
                <input type="password" id="confirmPassword" placeholder="Confirmar Senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;