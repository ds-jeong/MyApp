import React, {useEffect, useState, useRef } from 'react';
import './OrderHistory.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import ReviewPopup from './popup/ReviewPopup';
import ReturnRequestPopup from './popup/ReturnRequestPopup';
import OrderCancelPopup from "./popup/OrderCancelPopup";

/* 주문번호 별로 상품 그룹화 함수 */
const groupByOrderId = (arr) => {
    return arr.reduce((acc, item) => {
        // 주문번호가 존재하지 않는 경우 새 배열 생성
        if (!acc[item.orderId]) {
            acc[item.orderId] = {
                orderStatus: item.orderState, // orderId의 전체 주문 상태
                items: []                 // 주문 항목 목록
            };
        }
        // 해당 주문번호 배열에 상품 추가
        acc[item.orderId].items.push(item);
        return acc;
    }, {});
};

const OrderHistory = () => {

    /* localStorage에 저장된 사용자의 정보 */
    const userDataStr = window.localStorage.getItem('userData');

    /* Json으로 파싱 */
    const userData = JSON.parse(userDataStr);

    /* 파싱한 데이터를 변수에 저장 */
    const userInfo = userData?.userInfo;

    /* 주문내역 조회 */
    const id = userInfo.id;
    const [resArr, setResArr] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.post(`/user/mypage/orderHistory?id=${id}`);
            setResArr(response.data);
        } catch (error) {
            console.error("Error fetching fetchData", error);
        }
    };

    /* 주문번호별로 상품 그룹화 */
    const groupedOrders = groupByOrderId(resArr);

    const navigate = useNavigate();
    const handleProductDetail = (productId) => {
        navigate(`/userProductDetail/${productId}`);
    };


    /* 리뷰 */
    const [showReviewPopup, setShowReviewPopup] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleReviewButtonClick = (item) => {
        setSelectedProduct(item);
        setShowReviewPopup(true);
    };

    /* 반품 */
    const [showReturnPopup, setShowReturnPopup] = useState(false);
    const [selectedReturnProduct, setSelectedReturnProduct] = useState(null);

    const handleReturnButtonClick = (item) => {
        setSelectedReturnProduct(item);
        setShowReturnPopup(true);
    };

    /* 주문 취소 */
    const [showOrderCancelPopup, setShowOrderCancelPopup] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleOrderCancelButtonClick = (orderId, item) => {
        setSelectedOrder({
            orderId: orderId,
            productId: item.productId,
            productNm: item.productNm,
            filePath: item.filePath,
            orderDetailId: item.orderDetailId,
        });
        setShowOrderCancelPopup(true);
    };

    return (
        <div>
            {Object.entries(groupedOrders).map(([orderId, orderData], index) => (
                <div key={orderId} className="order-group">
                    {/* 첫 번째 주문 번호 그룹에 대해서만 헤더 렌더링 */}
                    {index === 0 && (
                        <div className="order-header">
                            <div className="header-item">주문일자</div>
                            <div className="header-item">이미지</div>
                            <div className="header-item">상품정보</div>
                            <div className="header-item">수량</div>
                            <div className="header-item">상품구매금액</div>
                            <div className="header-item">주문처리상태</div>
                            <div className="header-item">리뷰&반품</div>
                        </div>
                    )}
                    <div className="order-items">
                        <div>주문번호: {orderId}</div>
                        <div>전체 주문 상태: {orderData.orderStatus}</div>
                        {orderData.items.map((item) => (
                            <div key={item.productId} className="order-card">
                                <div className="order-item">{item.orderDate}</div>
                                <div className="order-item">
                                    <img src={item.filePath} alt={item.productNm} className="order-image"
                                         onClick={() => handleProductDetail(item.productId)}/>
                                </div>
                                <div className="order-item">{item.productNm}</div>
                                <div className="order-item">{item.quantity}</div>
                                <div className="order-item">{item.price}</div>
                                <div className="order-item">{item.orderDetailState}</div>
                                <div className="order-item">
                                    {/* 리뷰 작성 버튼 */}
                                    {item.orderDetailState === 'DELIVERED' && (
                                        <button onClick={() => handleReviewButtonClick(item)}>리뷰 작성</button>
                                    )}
                                    {/* 리뷰 팝업 */}
                                    {selectedProduct && (
                                        <ReviewPopup
                                            product={{
                                                productId: selectedProduct.productId,
                                                productNm: selectedProduct.productNm,
                                                filePath: selectedProduct.filePath,
                                                orderDetailId: selectedProduct.orderDetailId,
                                            }}
                                            show={showReviewPopup}
                                            onClose={() => setShowReviewPopup(false)}
                                        />
                                    )}
                                    {/* 반품 요청 버튼 */}
                                    {/* returnReqStatus가 null, undefined, 빈 문자열일 때 또는 item.state가 '주문완료'일 때 */}
                                    {((!item.returnReqStatus || item.returnReqStatus.trim() === '') && item.orderDetailState === 'DELIVERED') && (
                                        <button onClick={() => handleReturnButtonClick(item)}>반품</button>
                                    )}
                                    {/* 반품 팝업 */}
                                    {selectedReturnProduct && (
                                        <ReturnRequestPopup
                                            product={{
                                                productId: selectedReturnProduct.productId,
                                                productNm: selectedReturnProduct.productNm,
                                                filePath: selectedReturnProduct.filePath,
                                                orderDetailId: selectedReturnProduct.orderDetailId,
                                            }}
                                            show={showReturnPopup}
                                            onClose={() => setShowReturnPopup(false)}
                                        />
                                    )}
                                    {/* 주문 취소 버튼(결제완료/배송대기 상태일 때만 가능)*/}
                                    {(item.orderDetailState === 'AWAITING_SHIPMENT' || item.orderDetailState === 'PAYMENT_COMPLETED' || item.orderDetailState === 'PARTIALLY_CANCELLED') && (
                                        <button onClick={() => handleOrderCancelButtonClick(orderId, item)}>주문 취소</button>
                                    )}
                                    {/* 주문 취소 팝업 */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            {selectedOrder && (
                <OrderCancelPopup
                    product={selectedOrder}
                    show={showOrderCancelPopup}
                    onClose={() => setShowOrderCancelPopup(false)}
                />
            )}
        </div>
    );
};

export default OrderHistory;