import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const KakaoCallback = () => {
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get("code");

    useEffect(() => {
        const kakaoLogin = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_REDIRECT_URL}/?code=${code}`, {
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                });

                //로그인한 사용자 정보
                const userInfo =response.data.userInfo;
                //로그인한 사용자 정보를 받아 객체에 저장
                const dataToSave = {userInfo};
                //전역에서 사용할수 있도록 localStorage에 저장
                window.localStorage.setItem('token', response.data.token);
                window.localStorage.setItem('userData', JSON.stringify(dataToSave));

                // Navigate to home page after storing the token
                navigate("/");

            } catch (error) {
                console.error("Error during Kakao login:", error);
            }
        };

        // Only trigger the login if the code is available
        if (code) {
            kakaoLogin();
        }
    }, [code, navigate]);

    return (
        <div className="LoginHandler">
            <p>로그인 중입니다...</p>
        </div>
    );
};

export default KakaoCallback;
