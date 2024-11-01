import React, { useState } from 'react';
import './StarRating.css';

const StarRating = ({ totalStars = 5, onRating }) => {
    const [rating, setRating] = useState(0);

    const handleClick = (value) => {
        setRating(value);
        if (onRating) {
            onRating(value);
        }
    };

    return (
        <div className="star-rating">
            {[...Array(totalStars)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <span
                        key={starValue}
                        className={`star ${starValue <= rating ? 'filled' : ''}`}
                        onClick={() => handleClick(starValue)}
                    >
            ★
          </span>
                );
            })}
        </div>
    );
};

export default StarRating;