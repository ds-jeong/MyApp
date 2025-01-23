import React, { useState, useEffect } from 'react';
import './ShippingManage.css'; // 스타일링 파일 분리

const ShippingManage = () => {
    const [shippingData, setShippingData] = useState([]);
    const [filterStatus, setFilterStatus] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // 예시 데이터 로드 함수
    useEffect(() => {
        fetchShippingData();
    }, []);

    const fetchShippingData = async () => {
        const response = await fetch('/api/admin/shipping/userShipData');
        const data = await response.json();
        setShippingData(data);
    };

    // 상태 필터링
    const filteredData = shippingData.filter((item) =>
        filterStatus === 'All' || item.status === filterStatus
    ).filter((item) =>
        item.orderNumber.includes(searchQuery) || item.recipient.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="shipping-manage-container">
            <h1>배송 관리</h1>

            <div className="filter-bar">
                <select onChange={(e) => setFilterStatus(e.target.value)} value={filterStatus}>
                    <option value="All">전체</option>
                    <option value="AWAITING_SHIPMENT">배송 준비 중</option>
                    <option value="IN_TRANSIT">배송 중</option>
                    <option value="DELIVERED">배송 완료</option>
                </select>
                <input
                    type="text"
                    placeholder="주문번호 또는 수령인 검색"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <table className="shipping-table">
                <thead>
                <tr>
                    <th>주문번호</th>
                    <th>수령인</th>
                    <th>배송 상태</th>
                    <th>주문 날짜</th>
                    <th>작업</th>
                </tr>
                </thead>
                <tbody>
                {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                        <tr key={item.orderId}>
                            <td>{item.orderNumber}</td>
                            <td>{item.recipient}</td>
                            <td>{item.status}</td>
                            <td>{item.orderDate}</td>
                            <td>
                                <button onClick={() => updateShippingStatus(item.orderId, item.orderNumber)}>
                                    상태 변경
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5">데이터가 없습니다.</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

// 상태 변경 함수 예시
const updateShippingStatus = async (orderId, orderNumber) => {
    alert(`주문번호 ${orderNumber}의 상태를 변경합니다.`);
    const response = await fetch('/api/admin/shipping/userShipData');
    const data = await response.json();
};

export default ShippingManage;
