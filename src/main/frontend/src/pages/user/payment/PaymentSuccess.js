import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import '../../../css/PaymentResult.css';
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const PaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { paymentInfo } = location.state;

    const formatTimestamp = (timestamp) => {
        // Unix timestamp를 Date 객체로 변환
        const date = new Date(timestamp * 1000); // 초 단위로 제공된 경우

        // 날짜 및 시간 포맷 지정
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false, // 24시간 형식 사용
        };

        // 날짜를 직관적으로 변환
        return date.toLocaleString('ko-KR', options);
    };

    const handleDetailClick = () => {
        const orderNumber = paymentInfo.merchant_uid.substring(4); // "on"부터 잘라낸 값
        console.log(orderNumber);

        axios.get(`${BACKEND_URL}/user/order/getOrderId`, {
            params: {
                orderNumber: orderNumber,
            },
        })
            .then(response => {
                console.log(response.data);
                // Ensure you are using a complete path
                navigate(`/order/detail?orderId=${response.data}`, { state: { paid_amount: paymentInfo.paid_amount } });
            })
            .catch(error => {
                console.error('Error fetching order details:', error);
            });
    };


    const handleContinueShoppingClick = () => {
        // 쇼핑 계속하기 페이지로 이동
        navigate('/');
    };

    return (
        <div className="payment-result-container">
            <div className="container">
                <>
                    <h2 className="header">Payment Receipt</h2>
                    <div className="infoSection">
                        <p><strong>주문 번호:</strong> {paymentInfo.merchant_uid}</p>
                        <p><strong>결제 날짜:</strong> {formatTimestamp(paymentInfo.paid_at)}</p>
                        <p><strong>결제 수단:</strong> card</p>
                        <p><strong>주문 상태:</strong> 결제 완료</p>
                        <p><strong>총 결제금액:</strong> {paymentInfo.paid_amount}</p>
                    </div>
                    <div>
                        <button onClick={handleDetailClick}>상세내역 보기</button>
                        <button onClick={handleContinueShoppingClick}>쇼핑 계속하기</button>
                    </div>
                </>
            </div>
        </div>
    );

}

export default PaymentSuccess;