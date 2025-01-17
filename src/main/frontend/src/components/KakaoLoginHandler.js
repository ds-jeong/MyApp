import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/style.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;


const KakaoLoginCallback = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);  // Track loading state
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    useEffect(() => {
        const handleLogin = async () => {
            const code = new URL(window.location.href).searchParams.get('code');
            const state = new URL(window.location.href).searchParams.get('state');

            if (code) {
                try {
                    const response = await fetch(`/api/login/kakao/callback?code=${code}`, {
                        headers: {
                            "Content-Type": "application/json;charset=utf-8",
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Login failed');
                    }

                    const data = await response.json();

                    // Store JWT in local storage
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('type', 'kakao');
                    localStorage.setItem('state', state);
                    // `userData`를 `userInfo` 속성으로 중첩하여 저장
                    const userDataWithUserInfo = { userInfo: data.userInfo };
                    localStorage.setItem('userData', JSON.stringify(userDataWithUserInfo));
                    setIsAuthenticated(true);  // 상태 업데이트

                    // Redirect to the main page
                    setIsLoading(false);
                    window.location.replace('/');
                } catch (error) {
                    console.error('Error during Kakao login:', error);
                    setIsLoading(false);
                }
            }
        };

        handleLogin();
    }, [navigate]);

    // Display loading message while login is in progress
    return (
        <div className="LoginHandler">
            {isLoading ? <p>로그인 중 입니다.</p> : <p>Redirecting...</p>}
        </div>
    );
};

export default KakaoLoginCallback;
