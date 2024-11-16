import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/styles.scss';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/Auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                    confirmPassword,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Registration successful!');
                navigate('/login');
            } else {
                alert('Registration failed: ' + data.message);
            }

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
        }
    };
    return (
        <div className='register-container'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;