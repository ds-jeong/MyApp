import React, {useState} from 'react';
import axios from 'axios';
import {Button, Container, Form} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const CLIENT_ID = process.env.REST_API_KEY;
const REDIRECT_URI  = process.env.REDIRECT_URI;
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const kakaoLoginHandler = (props) => {
        const naviagte = useNavigate();
        const code = new URL(window.location.href).searchParams.get("code");

        const kakaoLogin = async () => {
            const response = await axios({
                method: "GET",
                url: `${process.env.REDIRECT_URL}/?code=${code}`,
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
            }).then((res) => {
                console.log(res);
                //로그인 성공시 이동페이지
                naviagte("");
            });
        };

        kakaoLogin();
        return (
            <div className="LoginHandeler">
                <div className="notice">
                    <p>로그인 중입니다.</p>
                    <p>잠시만 기다려주세요.</p>
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }


export default redirectHandler;
