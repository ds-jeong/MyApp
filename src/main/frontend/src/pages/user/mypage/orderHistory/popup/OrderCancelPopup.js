import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from "axios";

const OrderCancelPopup = ({product, show, onClose}) => {
    const [cancelReason, setCancelReason] = useState('');
    const [otherReason, setOtherReason] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!cancelReason) {
            alert('주문 취소 사유를 입력해주세요.');
            return;
        }

        const formData = new FormData();
        formData.append('orderId', product.orderId);
        formData.append('orderDetailId', product.orderDetailId);
        formData.append('productId', product.productId);
        const finalReason = cancelReason === '기타' ? otherReason : cancelReason;
        formData.append('reason', finalReason);

        try {
            const response = await axios.post('/api/user/mypage/orderCancel', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',  // 'multipart/form-data'로 설정
                }
            });
            if (response.status === 200) {
                alert('주문 취소 요청이 성공적으로 접수되었습니다.');
                onClose();
            } else {
                alert('주문 취소 요청에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('주문 취소 요청 오류:', error);
            alert('주문 취소 요청에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>주문 취소 요청</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="product-info">
                    <img
                        src={product?.filePath}
                        alt={product?.productNm}
                        className="product-image"
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                    <h5>{product?.productNm}</h5>
                </div>
                <Form>
                    <Form.Group controlId="cancelReason">
                        <Form.Label>취소 사유</Form.Label>
                        <Form.Control
                            as="select"
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                        >
                            <option value="">사유 선택</option>
                            <option value="배송 지연">배송 지연</option>
                            <option value="단순 변심">단순 변심</option>
                            <option value="상품 불량">상품 불량</option>
                            <option value="기타">기타</option>
                        </Form.Control>
                    </Form.Group>
                    {cancelReason === '기타' && (
                        <Form.Group controlId="otherReason">
                            <Form.Label>기타 사유</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={otherReason}
                                onChange={(e) => setOtherReason(e.target.value)}
                                placeholder="기타 사유를 입력해주세요."
                            />
                        </Form.Group>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="danger"
                    onClick={handleSubmit}
                    disabled={!cancelReason || (cancelReason === '기타' && !otherReason.trim())}
                >
                    주문 취소
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    닫기
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default OrderCancelPopup;
