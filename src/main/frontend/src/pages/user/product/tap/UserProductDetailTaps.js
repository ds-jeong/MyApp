import React, { useState } from 'react';
import './UserProductDetailTaps.css';
import {Container, Row, Col, Button, Image, Form, CardImg, FormControl} from 'react-bootstrap';

const UserProductDetailTaps = () => {
    const [activeTab, setActiveTab] = useState('details');

    const renderContent = () => {
        switch (activeTab) {
            case 'details':
                return <div>상품 상세보기 내용</div>;
            case 'reviews':
                return <div>상품 리뷰 내용</div>;
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="tabs">
                <Button onClick={() => setActiveTab('details')}>상세보기</Button>
                <Button onClick={() => setActiveTab('reviews')}>리뷰</Button>
            </div>
            <div className="tab-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default UserProductDetailTaps;