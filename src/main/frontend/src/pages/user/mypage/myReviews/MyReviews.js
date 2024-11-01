import React, {useEffect, useState, useRef} from 'react';
import axios from "axios";
import './MyReviews.css';

const MyReviews = () => {

    /* localStorage에 저장된 사용자의 정보 */
    const userDataStr = window.localStorage.getItem('userData');

    /* Json으로 파싱 */
    const userData = JSON.parse(userDataStr);

    /* 파싱한 데이터를 변수에 저장 */
    const userInfo = userData?.userInfo;

    /* 내가 쓴 리뷰 조회 */
    const id = userInfo.id;
    const [resArr, setResArr] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.post(`/user/mypage/review/myReviewsList?id=${id}`);
            setResArr(response.data);
        } catch (error) {
            console.error("Error fetching fetchData", error);
        }
    };

    return (
        <div>
            <div className="order-group">
                {/* 첫 번째 주문 번호 그룹에 대해서만 헤더 렌더링 */}
                <div className="order-header">
                    <div className="header-item">주문일자</div>
                    <div className="header-item">상품 이미지</div>
                    <div className="header-item">상품명</div>
                    <div className="header-item">제목</div>
                    <div className="header-item">내용</div>
                    <div className="header-item">리뷰 이미지</div>
                    <div className="header-item">별점</div>
                </div>
                <div className="order-items">
                    {resArr && resArr.map((item, index) => (
                        <div className="order-card" key={index}>
                            <div className="order-item">{item.orderDate}</div>
                            <div className="order-item">
                                <img src={item.filePath} alt={item.productNm} className="order-image"/>
                            </div>
                            <div className="order-item">{item.productNm}</div>
                            <div className="order-item">{item.title}</div>
                            <div className="order-item">{item.content}</div>
                            <div className="order-item">
                                <img src={item.reviewImgPath} alt={item.reviewImgNm} className="order-image"/>
                            </div>
                            <div className="order-item">
                            {Array.from({ length: 5 }, (v, i) => (
                                    <span key={i} className={i < item.rating ? 'star filled' : 'star'}>
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))};
                </div>
            </div>
        </div>
    )
};

export default MyReviews;
