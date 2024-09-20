import React, {useState} from 'react';
import axios from 'axios';
import {Button, Container, Form} from 'react-bootstrap';
const CLIENT_ID = process.env.REACT_APP_REST_API_KEY;
const REDIRECT_URI  = process.env.REACT_APP_REDIRECT_URL;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=account_email,name,phone_number`;

const Login = () => {
    const [userId, setUserId] = useState('');
    const [pw, setPw] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            const response = await axios.post('/api/login', formData);
            
            //로그인한 사용자 정보
            const userInfo =response.data.userInfo;
            //로그인한 사용자 정보를 받아 객체에 저장
            const dataToSave = {userInfo};
            //전역에서 사용할수 있도록 localStorage에 저장
            window.localStorage.setItem('token', response.data.token);
            window.localStorage.setItem('userData', JSON.stringify(dataToSave));

            // 로그인 후 메인 페이지로 리디렉션
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
                    <div className="kakaoLoginBtn">
                    <a href={KAKAO_AUTH_URL}>
                        <img src={process.env.PUBLIC_URL + '/assets/images/kakao_login_medium_wide.png'} alt="카카오 로그인"/>
                    </a>

                    </div>
                </Form>

            </Container>
        </div>
    );
};

export default Login;