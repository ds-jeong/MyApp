import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import '../../../css/OrderDetail.css';
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const OrderDetail = () => {
    // 쿼리 파라미터에서 orderId 값을 추출
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('orderId');
    const paidAmount = location.state?.paid_amount;

    const [loading, setLoading] = useState(true);      // 로딩 상태
    const [orderInfo, setOrderInfo] = useState(null);  // 주문 정보를 저장할 state
    const [orderDetails, setOrderDetails] = useState([]); // 주문 세부 정보를 저장할 state

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // 요청 시작 전에 로딩 상태 설정

                // 첫 번째 요청: orderInfo
                const orderInfoResponse = await axios.get(`/api/user/order/orderInfo?orderId=${orderId}`);
                if (orderInfoResponse.status === 200) {
                    setOrderInfo(orderInfoResponse.data);
                    console.log(orderInfoResponse.data);
                } else {
                    throw new Error('Failed to fetch order info');
                }

                // 두 번째 요청: orderDetails
                const orderDetailsResponse = await axios.get(`/api/user/order/orderDetails?orderId=${orderId}`);
                if (orderDetailsResponse.status === 200) {
                    setOrderDetails(orderDetailsResponse.data);
                } else {
                    throw new Error('Failed to fetch order details');
                }

            } catch (error) {
                console.error('Error fetching data:', error);
                setOrderInfo(null); // 오류 발생 시 상태 초기화
                setOrderDetails([]);
            } finally {
                setLoading(false); // 모든 요청이 끝난 후 로딩 상태 해제
            }
        };

        fetchData();
    }, [orderId]);

    const handleOrderCancelClick = () => {
        navigate(`/order/cancel?orderId=${orderId}`); // 주문 취소 페이지로 이동
    };

    const handleGotoMainClick = () => {
        navigate('/');
    };

    // Loading 상태일 때 렌더링
    if (loading) {
        return <div>Loading...</div>;
    }

    console.log(orderDetails);
    // Ensure orderInfo and orderDetails are available before rendering
    if (!orderInfo || !orderDetails) {
        return <div>주문 정보가 없습니다.</div>;  // Message when data is not available
    }

    return (
        <div className="order-details-container">
            <h2 className="header">주문 상세 내역</h2>
            <div className="order-info">
                <p><strong>주문 번호:</strong> {orderInfo.orderNumber}</p>
                <p><strong>주문자:</strong> {orderInfo.orderer}</p>
                <p><strong>결제 수단:</strong> card</p>
                <p><strong>총 결제금액:</strong> {paidAmount} 원</p>
                <p><strong>주문 상태:</strong> {orderInfo.state}</p>
                <p><strong>주문 날짜:</strong> {new Date(orderInfo.orderDate).toLocaleString('ko-KR')}</p>
            </div>
            <div className="order-items">
                <h3 align="center">주문 상품</h3>
                <ul>
                    {orderDetails.length > 0 ? (
                        orderDetails.map((item, index) => (
                            <li key={index} className="orderItem">
                                {item.productNm} - {item.quantity}개
                            </li>
                        ))
                    ) : (
                        <p>No order details available.</p> // Handle the case where there are no order details
                    )}
                </ul>
            </div>

            <div className="btnsSection">
                <button className="btns" onClick={handleOrderCancelClick}>주문 취소</button>
                <button className="btns" onClick={handleGotoMainClick}>메인으로 가기</button>
            </div>
        </div>
    );
};

export default OrderDetail;
