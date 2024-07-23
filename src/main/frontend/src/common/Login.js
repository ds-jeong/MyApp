import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Col } from 'react-bootstrap';

const Login = () => {
    const [userId, setUserId] = useState('');
    const [pw, setPw] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', {
                userId,
                pw
            });
            console.log('Login success:', response);
            // 로그인 성공 후의 처리
        } catch (error) {
            alert("로그인에 실패하였습니다.");
            console.error('Login failed:', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label>ID:</label>
                <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)}/><br/>
                <label>PW:</label>
                <input type="password" value={pw} onChange={(e) => setPw(e.target.value)}/><br/>
                <Button type="submit">Login</Button>
                <Button type="button" href={`/join`}>Join</Button>
            </form>
        </div>
    );
};

export default Login;