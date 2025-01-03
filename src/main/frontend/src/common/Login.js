import React, {useState} from 'react';
import axios from 'axios';
import {Button, Container, Form} from 'react-bootstrap';
import kakaoImage from '../images/kakao_login_medium_narrow.png';

const CLIENT_ID = process.env.REACT_APP_REST_API_KEY;
const REDIRECT_URI  = process.env.REACT_APP_LOGIN_REDIRECT_URL;
const uuid = crypto.randomUUID();
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=account_email,name,phone_number&state=${uuid}`;

const Login = () => {
    const [userId, setUserId] = useState('');
    const [pw, setPw] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            const response = await axios.post('/api/login', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Response:', response);
            console.log('Response Data:', response.data);
            console.log('Response Headers:', response.headers);
            window.localStorage.setItem('data', response.data);

            //로그인한 사용자 정보
            const userInfo = response.data.userInfo;
            //로그인한 사용자 정보를 받아 객체에 저장
            const dataToSave = {userInfo};
            //전역에서 사용할수 있도록 localStorage에 저장
            window.localStorage.setItem('token', response.data.token);
            window.localStorage.setItem('userData', JSON.stringify(dataToSave));

            window.location.replace('/');
        } catch (error) {
            alert("로그인에 실패하였습니다.");
            console.error('Login failed:', error);
        }
    };

    return (
        <div>
            <Container>
                <Form className="custom-form" onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="formUserId">
                        <Form.Label>아이디</Form.Label>
                        <Form.Control
                            name="userId"
                            type="text"
                            placeholder="아이디를 입력하세요"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control
                            name="pw"
                            type="password"
                            placeholder="비밀번호를 입력하세요"
                            value={pw}
                            onChange={(e) => setPw(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        로그인
                    </Button>
                    <div style={{display: 'inline-block', marginLeft: '10px'}}>
                        <a href={KAKAO_AUTH_URL}>
                            <img src={kakaoImage} alt="카카오 로그인" style={{width: '160px', marginBottom: '5px', display:'inline-block'}}/>
                        </a>
                    </div>
                </Form>
            </Container>
        </div>
    );
};

export default Login;