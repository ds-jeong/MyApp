import React, {useState} from 'react';
import './MyPage.css';
import OrderHistory from './orderHistory/OrderHistory';
import MyReviews from './myReviews/MyReviews';

function MyPage() {

    const [activeTab, setActiveTab] = useState('orders');

    const renderContent = () => {
        switch (activeTab) {
            case 'orders':
                return <div><OrderHistory/></div>;
            case 'favorites':
                return <div>관심 상품 내용</div>;
            case 'myReviews':
                return <div><MyReviews/></div>;
            default:
                return null;
        }
    };

    return (
        <div className="mypage-container">
            <div className="sidebar">
                <h2>나의 쇼핑</h2>
                <div
                    className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
                    onClick={() => setActiveTab('orders')}
                >
                    주문 내역
                </div>
                <div
                    className={`tab ${activeTab === 'favorites' ? 'active' : ''}`}
                    onClick={() => setActiveTab('favorites')}
                >
                    관심 상품
                </div>
                <div
                    className={`tab ${activeTab === 'myReviews' ? 'active' : ''}`}
                    onClick={() => setActiveTab('myReviews')}
                >
                    내가 쓴 리뷰
                </div>
            </div>
            <div className="content">
                {renderContent()}
            </div>
        </div>
    )
        ;
}

export default MyPage;