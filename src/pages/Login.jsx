import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { loading, error, user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser({ username, password }));
    };

    useEffect(() => {
        if (user) {
            navigate('/products');
        }
    }, [user, navigate]);

    return (
        <div className={styles.page}>
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={handleLogin}>
                    <h1 className={styles.title}>Welcome Back 👋</h1>

                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            placeholder="Username"
                            className={styles.input}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            placeholder="Password"
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    {error && <p className={styles.error}>{error}</p>}
                </form>
            </div>
        </div>
    );
}
