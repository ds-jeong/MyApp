import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const KakaoCallback = (props) => {
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get("code");

//인가코드 백으로 보내는 코드
    useEffect(() => {
        const kakaoLogin = async () => {
            await axios({
                method: "GET",
                url: `${process.env.REACT_APP_REDIRECT_URL}/?code=${code}`,
                headers: {
                    "Content-Type": "application/json;charset=utf-8", //json형태로 데이터를 보내겠다는뜻
                    "Access-Control-Allow-Origin": "*"
                },
            }).then((res) => { //백에서 완료후 우리사이트 전용 토큰 넘겨주는게 성공했다면
                // JWT 토큰 저장 (로컬 스토리지나 쿠키)
                localStorage.setItem('jwtToken', res.data.token);
                // 이후 토큰이 필요할 때 사용할 수 있음
                console.log('JWT Token:', res.data.token);
                //로그인이 성공하면 이동할 페이지
                navigate("/");
            }).catch((err) => {
                console.log("err  :  " + err);
            });
        };
        kakaoLogin();
    }, [props.history]);

    return (
        <div className="LoginHandeler">
            <p>로그인 중입니다.</p>
        </div>
    );
};

export default KakaoCallback;
