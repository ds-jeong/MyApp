import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoLoginCallback = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);  // Track loading state

    useEffect(() => {
        const handleLogin = async () => {
            const code = new URL(window.location.href).searchParams.get('code');
            if (code) {
                try {
                    // Make the request to your Spring Boot API
                    const backendUrl = 'http://localhost:8081';
                    const response = await fetch(`${backendUrl}/login/kakao/callback?code=${code}`, {
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
                    localStorage.setItem('userData', JSON.stringify(data.userInfo));

                    // Redirect to the main page
                    setIsLoading(false);
                    navigate('/');  // Assuming your main page route is '/'
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
            {isLoading ? <p>Logging in...</p> : <p>Redirecting...</p>}
        </div>
    );
};

export default KakaoLoginCallback;
