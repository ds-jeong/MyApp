import React, { useState } from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";


function Payment({ imp }) {
    const [isLoading, setIsLoading] = useState(false);
    const { formData } = useParams();

    const handlePayment = () => {
        setIsLoading(true);

        // 결제 요청 정보 설정 (예시)
        const req = {
            pg: "html5_inicis",
            pay_method: "card",
            // merchant_uid: `payment-${formData.id}`, // 주문 고유 번호
            merchant_uid: `payment-${formData.id}`, // 주문 고유 번호
            name: formData.orderDetails.map(item => item.productNm).join(", ") + " 외 " + formData.orderDetails.length + "건",
            amount: formData.totalPayment.toLocaleString(),
            buyer_email: formData.email,
            buyer_name: formData.orderer,
            buyer_tel: formData.tel,
            buyer_addr: formData.addr + formData.address1 + formData.address2,
            buyer_postcode: formData.zonecode,
        };

        // 결제 요청
        imp.request_pay(req, (response) => {
            setIsLoading(false);
            // 결제 결과 처리
            if (response.error_code != null) {
                return alert(`결제에 실패하였습니다. 에러 내용: ${response.error_msg}`);
            }

            axios.post(`/user/order/payment/${response.imp_uid}`, {
                imp_uid: response.imp_uid,
                merchant_uid: response.merchant_uid,
                id: formData.id
            })

        });
    };

    return (
        <div>
            결제진행중
        </div>
        // <button disabled={isLoading} onClick={handlePayment}>
        //     {isLoading ? '결제 진행 중...' : '결제하기'}
        // </button>
    );
}

export default Payment;