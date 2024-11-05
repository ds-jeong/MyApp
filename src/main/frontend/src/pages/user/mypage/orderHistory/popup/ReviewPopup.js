import React, { useState, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import './ReviewPopup.css';
import StarRating from 'components/starRating/StarRating';

const ReviewPopup = ({ product, show, onClose }) => {
    const [rating, setRating] = useState(0);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageName, setImageName] = useState('');

    const productIdRef = useRef();
    const orderDetailIdRef = useRef();
    const titleRef = useRef();
    const contentRef = useRef();
    const fileRef = useRef();

    const handleRating = (value) => {
        setRating(value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageName(file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('productId', productIdRef.current.value);
        formData.append('orderDetailId', orderDetailIdRef.current.value);
        formData.append('rating', rating);
        formData.append('title', titleRef.current.value);
        formData.append('content', contentRef.current.value);
        if (fileRef.current.files[0]) {
            formData.append('file', fileRef.current.files[0]);
        }

        try {
            const response = await axios.post('/user/mypage/review/insertReview', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (response.status === 200) {
                alert("리뷰가 등록되었습니다.");
                onClose();
            } else {
                alert('리뷰 등록에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            if (error){
                alert("이미 작성된 리뷰입니다.");
                onClose();
            }
        }
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{product.productNm}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input type="hidden" value={product.productId} ref={productIdRef}/>
                <input type="hidden" value={product.orderDetailId} ref={orderDetailIdRef}/>
                <img src={product.filePath} alt={product.productNm} className="product-image" />
                <div style={{ textAlign: 'center', margin: '20px' }}>
                    <h1>리뷰 작성</h1>
                    <StarRating onRating={handleRating} />
                </div>
                <input type="text" ref={titleRef} />
                <textarea ref={contentRef} placeholder="리뷰를 작성해주세요..." />
                <input
                    type="file"
                    ref={fileRef}
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ margin: '10px 0' }}
                />
                {imagePreview && (
                    <div className="image-preview" style={{ textAlign: 'center', margin: '10px 0' }}>
                        <img src={imagePreview} alt="미리보기" style={{ width: '250px', height: '150px' }} />
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit}>등록</Button>
                <Button variant="secondary" onClick={onClose}>닫기</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ReviewPopup;