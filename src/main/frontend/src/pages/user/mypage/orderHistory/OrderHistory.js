import React, {useEffect, useState, useRef } from 'react';
import './OrderHistory.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import ReviewPopup from './popup/ReviewPopup';

/* 주문번호 별로 상품 그룹화 함수 */
const groupByOrderId = (arr) => {
    return arr.reduce((acc, item) => {
        // 주문번호가 존재하지 않는 경우 새 배열 생성
        if (!acc[item.orderId]) {
            acc[item.orderId] = [];
        }
        // 해당 주문번호 배열에 상품 추가
        acc[item.orderId].push(item);
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


    /* 리뷰 제출 */
    const [showReviewPopup, setShowReviewPopup] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleReviewButtonClick = (item) => {
        setSelectedProduct(item);
        setShowReviewPopup(true);
    };

    return (
        <div>
            {Object.entries(groupedOrders).map(([orderId, items], index) => (
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
                        </div>
                    )}
                    <div className="order-items">
                        <div>주문번호: {orderId}</div>
                        {items.map((item) => (
                            <div key={item.productId} className="order-card">
                                <div className="order-item">{item.orderDate}</div>
                                <div className="order-item">
                                    <img src={item.filePath} alt={item.productNm} className="order-image" onClick={() => handleProductDetail(item.productId)}/>
                                </div>
                                <div className="order-item">{item.productNm}</div>
                                <div className="order-item">{item.quantity}</div>
                                <div className="order-item">{item.price}</div>
                                <div className="order-item">{item.state}</div>
                                {/* 조건부 렌더링을 통한 리뷰 작성 버튼 추가 */}
                                {item.state === '주문완료' && (
                                    <button onClick={() => handleReviewButtonClick(item)}>리뷰 작성</button>
                                )}

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

                            </div>
                        ))}
                    </div>
                </div>
            ))}
            {/*{Object.entries(groupedOrders).map(([orderId, items]) => (*/}
            {/*    <div key={orderId} className="order-group">*/}
            {/*        <h2>주문번호: {orderId}</h2>*/}
            {/*        {index === 0 && (*/}

            {/*        )}*/}
            {/*        <div className="order-items">*/}
            {/*            {items.map((item) => (*/}
            {/*                <div key={item.productId} className="order-card">*/}
            {/*                    <img src={item.filePath} alt={item.productNm} className="order-image"/>*/}
            {/*                    <h3>{item.productNm}</h3>*/}
            {/*                    <p>주문 날짜: {item.orderDate}</p>*/}
            {/*                    <p>상태: {item.state}</p>*/}
            {/*                </div>*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*))}*/}
        </div>
        // <div className="order-history">
        //     <h2>주문 내역</h2>
        //     <div className="order-list">
        //         {/*{orders.map(order => (*/}
        //         {/*    <div key={order.id} className="order-card">*/}
        //         {/*        <img src={order.imageUrl} alt={order.product} className="order-image" />*/}
        //         {/*        <h3>{order.product}</h3>*/}
        //         {/*        <p>주문 날짜: {order.date}</p>*/}
        //         {/*        <p>상태: {order.status}</p>*/}
        //         {/*    </div>*/}
        //         {/*))}*/}
        //         {resArr && resArr.map((item, index) => (
        //             <div key={item.orderId} className="order-card">
        //                 <img src={item.filePath} alt={item.productNm} className="order-image"/>
        //                 <h3>{item.productNm}</h3>
        //                 <p>주문번호: {item.orderNumber}</p>
        //                 <p>주문 날짜: {item.orderDate}</p>
        //                 <p>상태: {item.state}</p>
        //             </div>
        //         ))}
        //     </div>
        // </div>
    );
};

export default OrderHistory;