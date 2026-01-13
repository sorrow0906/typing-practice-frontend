import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={{
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid var(--glass-border)'
        }}>
            <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                타자 연습 마스터
            </Link>
            <div style={{ display: 'flex', gap: '1rem' }}>
                {isAuthenticated ? (
                    <>
                        <Link to="/words">단어 관리</Link>
                        <Link to="/practice">연습하기</Link>
                        <button onClick={handleLogout} className="btn-secondary">로그아웃</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">로그인</Link>
                        <Link to="/signup">회원가입</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
