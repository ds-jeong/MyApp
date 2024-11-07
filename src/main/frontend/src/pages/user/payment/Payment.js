import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Payment = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { state } = useLocation();
    const { orderData } = state || {};  // Safely access state and orderData
    const navigate = useNavigate();

    useEffect(() => {
        if (!window.IMP) {
            console.error('Iamport가 로드되지 않았습니다.');
            alert('결제 모듈을 로드하는 데 실패했습니다. 잠시 후 다시 시도해주세요.');
            return;
        }

        /* 1. 가맹점 식별하기 */
        const {IMP} = window;
        IMP.init("imp00224460");

        /*2. 결제 데이터 정의하기*/
        const data = {
            pg: 'html5_inicis',                           // PG사
            pay_method: 'card',                           // 결제수단
            merchant_uid: `mid_${orderData.orderNumber}`,   // 주문번호
            amount: 1,                                     // 결제금액(TEST용 1원)
            name: `${new Date().getTime()}자 상품 주문`, // 주문명
            buyer_name: orderData.orderer,                // 구매자 이름
            buyer_tel: orderData.phone,                   // 구매자 전화번호
            buyer_email: orderData.email,                 // 구매자 이메일
            buyer_addr: orderData.address,                 // 구매자 주소
            buyer_postcode: orderData.zonecode,           // 구매자 우편번호
        }

        try {
        /* 4. 결제 창 호출하기 */
            IMP.request_pay(data, callback);
        } catch(error) {
            console.log('imp 호출 에러' + error);
        }

        /* 3. 콜백 함수 정의하기 */
        function callback(response) {
            const {
                success,
                imp_uid,
                merchant_uid,
                paid_at,
                paid_amount,
                error_msg,
            } = response;

            if (success) {
                alert('결제 성공');

                /* 결제내역 저장 */
                axios.post(`${BACKEND_URL}/user/payment/save`, {
                    imp_uid: imp_uid,
                    merchant_uid: merchant_uid,
                    paid_at: paid_at,
                    paid_amount: paid_amount,
                })
                    .then(response => {
                        navigate('/payment/success', {
                            state: {
                                paymentInfo: {
                                    merchant_uid,
                                    paid_at,
                                    paid_amount,
                                },
                            },
                        });
                    })
                    .catch(error => console.log(error));
            } else {
                alert(`결제 실패: ${error_msg}`);
                navigate('/');
            }
        }

        setIsLoading(false); // 로딩 완료

    }, [orderData, navigate]); // dependencies에 orderData와 navigate 추가

    if (isLoading) {
        return <div>Loading payment module...</div>; // 로딩 중일 때 표시할 내용
    }

    return (
        <p>Loading payment module...</p>
    );
}

export default Payment;
