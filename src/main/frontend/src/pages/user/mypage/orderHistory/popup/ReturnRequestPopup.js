import React, { useState } from 'react';
import axios from "axios";
import './ReturnRequestPopup.css';
import { Modal, Button, Form } from 'react-bootstrap';

const ReturnRequestPopup = ({ product, show, onClose }) => {
    const [returnReason, setReturnReason] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!returnReason) {
            alert('반품 사유를 입력해주세요.');
            return;
        }

        const formData = new FormData();
        formData.append('orderDetailId', product.orderDetailId);
        formData.append('productId', product.productId);
        formData.append('reason', returnReason);
        formData.append('status', 'PENDING');

        try {
            const response = await axios.post('/user/mypage/returnRequst/insertReturnRequst', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',  // 'multipart/form-data'로 설정
                }
            });
            if (response.status === 200) {
                alert('반품 요청이 성공적으로 접수되었습니다.');
                onClose();
            } else {
                alert('반품 요청에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('반품 요청 오류:', error);
            alert('반품 요청에 실패했습니다. 다시 시도해주세요.');
        }
    };
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>반품 요청</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="product-info">
                    <img src={product?.filePath} alt={product?.productNm} className="product-image" />
                    <h5>{product?.productNm}</h5>
                </div>
                <Form>
                    <Form.Group controlId="returnReason">
                        <Form.Label>반품 사유</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={returnReason}
                            onChange={(e) => setReturnReason(e.target.value)}
                            placeholder="반품 사유를 입력해주세요."
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit}>
                    반품
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    취소
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ReturnRequestPopup;
