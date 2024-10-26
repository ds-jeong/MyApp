import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";
import "../../../css/OrderCancel.css"

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const OrderCancel = () => {
    const [selectedReason, setSelectedReason] = useState('');
    const [otherReason, setOtherReason] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('orderId');

    const cancellationReasons = [
        '주문 변경',
        '배송 지연',
        '상품 불만족',
        '기타'
    ];

    const handleCancelOrder = () => {
        // 주문 취소
        const reasonToSend = selectedReason ? selectedReason : otherReason;
        console.log(reasonToSend);

        axios.post(`${BACKEND_URL}/user/payment/cancel?orderId=${orderId}&reason=${reasonToSend}`)
            .then(response => {
                //imp_uid, reason, amount, checksum 필요
                if(response.status === 200) {
                    alert('주문 취소 되었습니다.');
                    navigate('/');
                }
            })
            .catch(error => {
                alert(error.response.data);
                console.error('Error while cancel:', error);
            });
    };

    const handleBack = () => {
        // 뒤로가기 로직을 여기에 추가 (예: 페이지 전환)
        navigate(-1);
        console.log('뒤로가기');
    };

    return (
        <div className="cancel-payment-container">
            <h2 className="cancel-payment-header">결제 취소</h2>
            <label className="cancel-payment-label" htmlFor="reason">취소 사유:</label>
            <select
                className="cancel-payment-select"
                id="reason"
                value={selectedReason}
                onChange={(e) => {
                    setSelectedReason(e.target.value);
                    if (e.target.value !== '기타') {
                        setOtherReason('');
                    }
                }}
            >
                <option value="">선택하세요</option>
                {cancellationReasons.map((reason, index) => (
                    <option key={index} value={reason}>
                        {reason}
                    </option>
                ))}
            </select>
            {selectedReason === '기타' && (
                <div>
                    <label className="cancel-payment-label" htmlFor="otherReason">기타 사유:</label>
                    <input
                        className="cancel-payment-input"
                        type="text"
                        id="otherReason"
                        value={otherReason}
                        onChange={(e) => setOtherReason(e.target.value)}
                        placeholder="사유를 입력하세요"
                    />
                </div>
            )}
            <div className="cancel-payment-buttons">
                <button className="cancel-payment-btn" onClick={handleBack}>뒤로가기</button>
                <button className="cancel-payment-btn" onClick={handleCancelOrder}>확인</button>
            </div>
        </div>

    );

}

export default OrderCancel;