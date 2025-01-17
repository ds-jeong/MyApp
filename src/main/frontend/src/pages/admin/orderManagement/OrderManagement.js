import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderManagement.css';

const OrderManagement = () => {
    const [resArr, setResArr] = useState([]);
    const [orderStatus, setOrderStatus] = useState({});
    const [trackingNumbers, setTrackingNumbers] = useState({});
    const [shippingCompanies, setShippingCompanies] = useState({});

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const response = await axios.get('/api/admin/order/getAllOrders');
        setResArr(response.data);
    };

    const handleStatusChange = async (orderId) => {

        if (!orderStatus[orderId]) {
            alert("주문상태를 선택해주세요.");
            return;
        }

        if (!trackingNumbers[orderId]) {
            alert("송장 번호를 입력해주세요.");
            return;
        }

        if (!shippingCompanies[orderId]) {
            alert("배송업체를 입력해주세요.");
            return;
        }

        try {
            const response = await axios.put(`/api/admin/order/updateOrderStatus/${orderId}`, {
                status: orderStatus[orderId],
                trackingNumber: trackingNumbers[orderId],
                shippingCompany: shippingCompanies[orderId]
            });
            if (response.data) {
                alert('주문 상태가 업데이트되었습니다.');
                fetchOrders();
            }
        } catch (error) {
            console.error(error);
            alert('주문 상태 업데이트에 실패했습니다.');
        }
    };

    const handleInputChange = (orderId, field, value) => {
        if (field === 'status') {
            setOrderStatus(prevState => ({
                ...prevState,
                [orderId]: value
            }));
        }
        if (field === 'trackingNumber') {
            setTrackingNumbers(prevState => ({
                ...prevState,
                [orderId]: value
            }));
        }
        if (field === 'shippingCompany') {
            setShippingCompanies(prevState => ({
                ...prevState,
                [orderId]: value
            }));
        }
    };

    const groupedOrders = resArr.reduce((acc, order) => {
        if (!acc[order.orderId]) {
            acc[order.orderId] = [];
        }
        acc[order.orderId].push(order);
        return acc;
    }, {});

    const statusTranslations = {
        "ORDER_COMPLETED": "주문 완료",
        "AWAITING_SHIPMENT": "배송 준비 중",
        "IN_TRANSIT": "배송 중",
        "DELIVERED": "배송 완료",
        "AWAITING_PICKUP": "반품 승인중",
        "RETURN_IN_PROGRESS": "반품 중",
        "RETURN_COMPLETED": "반품 완료",
        "PAYMENT_COMPLETED": "결제완료",
        "PAYMENT_CANCELLED": "결제취소"
    };

    return (
        <div className="order-management-container">
            <div className="order-management-header">
                <div className="header-item">주문일자</div>
                <div className="header-item">이미지</div>
                <div className="header-item">상품정보</div>
                <div className="header-item">수량</div>
                <div className="header-item">사용자</div>
                <div className="header-item">주문처리상태</div>
                <div className="header-item">송장번호</div>
                <div className="header-item">배송 회사</div>
                <div className="header-item">-</div>
            </div>
            {Object.keys(groupedOrders).length > 0 ? (
                Object.keys(groupedOrders).map((orderId) => {
                    const orderGroup = groupedOrders[orderId];
                    return (
                        <div key={orderId} className="order-group-container">
                            <div className="order-tracking-container">
                                <h3>주문 번호: {orderId}</h3>
                                <div className="order-status-update">
                                    <label>주문처리상태: </label>
                                    <select
                                        // value={orderStatus[orderId] || orderGroup[0].status}
                                        onChange={(e) => handleInputChange(orderId, 'status', e.target.value)}
                                        className="status-dropdown"
                                    >
                                        <option value="ORDER_COMPLETED">주문 완료</option>
                                        <option value="AWAITING_SHIPMENT">배송 준비 중</option>
                                        <option value="IN_TRANSIT">배송 중</option>
                                        <option value="DELIVERED">배송 완료</option>
                                        <option value="AWAITING_PICKUP">반품 승인중</option>
                                        <option value="RETURN_IN_PROGRESS">반품 중</option>
                                        <option value="RETURN_COMPLETED">반품 완료</option>
                                    </select>
                                </div>
                                <label>송장 번호: </label>
                                <input
                                    type="text"
                                    value={trackingNumbers[orderId] || ''}
                                    onChange={(e) => handleInputChange(orderId, 'trackingNumber', e.target.value)}
                                    className="order-input"
                                />
                                <label>배송 회사: </label>
                                <input
                                    type="text"
                                    value={shippingCompanies[orderId] || ''}
                                    onChange={(e) => handleInputChange(orderId, 'shippingCompany', e.target.value)}
                                    className="order-input"
                                />
                                <button onClick={() => handleStatusChange(orderId)}
                                        className="status-update-button">
                                    수정
                                </button>
                            </div>
                            {orderGroup.map((item, index) => (
                                <div key={index} className="order-item-card">
                                    <div className="order-item">
                                        <div className="order-item-detail">{item.orderDate}</div>
                                        <div className="order-item-detail">
                                            <img src={`${item.filePath}`} alt="상품 이미지" className="product-image"/>
                                        </div>
                                        <div className="order-item-detail">{item.productNm}</div>
                                        <div className="order-item-detail">{item.quantity}</div>
                                        <div className="order-item-detail">{item.userNm}</div>
                                        <div
                                            className="order-item-detail">{statusTranslations[item.status] || item.status}</div>
                                        <div className="order-item-detail">{item.trackingNumber}</div>
                                        <div className="order-item-detail">{item.shippingCompany}</div>
                                        <div className="order-item-detail">
                                            --
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                })
            ) : (
                <div>주문이 없습니다.</div>
            )}
        </div>
    );
};

export default OrderManagement;
