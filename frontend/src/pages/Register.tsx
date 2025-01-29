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
    const { setUserName, setToken } = useUser();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('As senhas devem ser iguais!');
            return;
        }
        try {
            await api.post('/auth/register', { username: name, email, address, phone, password, confirmpassword: confirmPassword });
            const loginResponse = await api.post<LoginResponse>('/auth/login', { email, password });
            setUserName(loginResponse.data.userName);
            setToken(loginResponse.data.token);
            navigate('/restaurants');
        } catch (error: any) {
            setError(error.response.data.msg || 'Falha no registro!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <input type="text" id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <input type="text" id="address" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
            <div>
                <input type="text" id="phone" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div>
                <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
                <input type="password" id="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;