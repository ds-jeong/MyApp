import React, { useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Login = () => {
    const [userId, setUserId] = useState('');
    const [pw, setPw] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {

            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            const response = await axios.post('/api/login', formData);
            window.localStorage.setItem('accessToken', response.data.token);
            window.localStorage.setItem('userId', response.headers.get('userId'));
            window.localStorage.setItem('role', response.headers.get('role'));

            navigate('/');

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
                <input type="text" name="userId" value={userId} onChange={(e) => setUserId(e.target.value)}/><br/>
                <label>PW:</label>
                <input type="password" name="pw" value={pw} onChange={(e) => setPw(e.target.value)}/><br/>
                <Button type="submit">Login</Button>
                <Button type="button" href={`/join`}>Join</Button>
            </form>
        </div>
    );
};

export default Login;