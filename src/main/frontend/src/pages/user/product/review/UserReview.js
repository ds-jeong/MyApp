import React, {useEffect, useState} from 'react';
import './UserReview.css';
import axios from "axios";

const UserReview = ({ productId }) => {

    const [resArr, setResArr] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.post(`/api/user/product/review/reviewsList?productId=${productId}`);
            setResArr(response.data);
        } catch (error) {
            console.error("Error fetching fetchData", error);
        }
    };

    return (
        <div className="review-list">
            <h2 className="review-title">고객 리뷰</h2>
            {resArr.length === 0 ? (
                <p className="no-reviews">아직 리뷰가 없습니다.</p>
            ) : (
                resArr.map((item) => (
                    <div className="review-card" key={item.reviewId}>
                        <div className="review-header">
                            {/*<div className="review-author">{review.author}</div>*/}
                            <div className="review-date">{item.createdAt}</div>
                        </div>
                        <div className="review-rating">
                            {Array.from({length: 5}, (v, i) => (
                                <span key={i} className={i < item.rating ? 'star filled' : 'star'}>
                                    ★
                                </span>
                            ))}
                        </div>
                        <div className="review-title">{item.title}</div>
                        <div className="review-content">{item.content}</div>
                        {item.reviewImgPath && (
                            <div className="review-image">
                                <img src={item.reviewImgPath} alt={item.reviewImgNm}/>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default UserReview;
