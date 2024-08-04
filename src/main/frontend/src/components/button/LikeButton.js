import React, { useState } from 'react';
import emptyHeart from '../../images/emptyHeart.png';
import filledHeart from '../../images/filledHeart.png';

const LikeButton = ({ like, productId, onClick }) => {
    const [isLiked, setIsLiked] = useState(false);

    const handleClick = () => {
        setIsLiked(prevState => !prevState);
    };

    return (
        <button onClick={handleClick} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <img
                src={like ? filledHeart : emptyHeart}
                alt={like ? 'Filled Heart' : 'Empty Heart'}
                style={{ width: '24px', height: '24px' }}
                data-custom={productId}
                onClick={onClick}
            />
        </button>
    );
};

export default LikeButton;