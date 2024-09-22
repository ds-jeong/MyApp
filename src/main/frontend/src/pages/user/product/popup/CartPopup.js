import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './CartPopup.css';

const CartPopup = ({ isOpen, onClose }) => {

    const navigate = useNavigate();

    const handleGetCart = () => {
        onClose();
        /* useHistory import 안되면 아래 코드로 수정해서 반영 */
        /* 응답을 받고 제품 등록화면으로 돌아감 */
        navigate(`/cart`);
    };

    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>장바구니에 담김</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <img
                    src="https://via.placeholder.com/150"
                    alt="장바구니에 담김"
                    className="popup-image"
                />
                <h2>상품이 장바구니에 담겼습니다!</h2>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <Button variant="primary" onClick={handleGetCart} className="mr-2">
                    장바구니로 이동
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    계속 쇼핑하기
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CartPopup;