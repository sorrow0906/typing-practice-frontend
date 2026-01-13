import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

const SignupPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/auth/signup', { username, password });
            navigate('/login');
        } catch (err: any) {
            console.error(err);
            if (err.response && err.response.data) {
                // Try to show backend error message
                setError(typeof err.response.data === 'string' ? err.response.data : 'Signup failed. ' + JSON.stringify(err.response.data));
            } else {
                setError('Signup failed. Server might be down or unreachable.');
            }
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <div className="glass-card" style={{ width: '300px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>회원가입</h2>
                {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input
                        type="text"
                        placeholder="아이디"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn-primary">가입하기</button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
