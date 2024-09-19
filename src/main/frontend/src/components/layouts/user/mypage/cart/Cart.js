import React, { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import './Cart.css';

const Cart = () => {
    const [items, setItems] = useState([
        {
            id: 1,
            name: "상품 1",
            price: 10000,
            quantity: 1,
            shippingFee: 2500,
        },
        {
            id: 2,
            name: "상품 2",
            price: 20000,
            quantity: 1,
            shippingFee: 2500,
        },
        // 추가 상품 데이터...
    ]);

    const [selectedItems, setSelectedItems] = useState({});

    const handleQuantityChange = (id, value) => {
        setItems(items.map(item => (item.id === id ? { ...item, quantity: value } : item)));
    };

    const handleSelectItem = (id) => {
        setSelectedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleDeleteSelected = () => {
        setItems(items.filter(item => !selectedItems[item.id]));
        setSelectedItems({});
    };

    const totalAmount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const totalShipping = items.reduce((acc, item) => acc + item.shippingFee, 0);
    const totalPayment = totalAmount + totalShipping;

    return (
        <div className="cart-container">
            <h1>장바구니</h1>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>선택</th>
                    <th>상품정보</th>
                    <th>가격</th>
                    <th>수량</th>
                    <th>배송비</th>
                    <th>옵션</th>
                </tr>
                </thead>
                <tbody>
                {items.map(item => (
                    <tr key={item.id}>
                        <td>
                            <Form.Check
                                type="checkbox"
                                checked={selectedItems[item.id] || false}
                                onChange={() => handleSelectItem(item.id)}
                            />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.price.toLocaleString()} 원</td>
                        <td>
                            <Form.Control
                                type="number"
                                value={item.quantity}
                                min="1"
                                onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                            />
                        </td>
                        <td>{item.shippingFee.toLocaleString()} 원</td>
                        <td>
                            <Button variant="danger" onClick={() => handleDeleteSelected(item.id)}>삭제</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <div className="total-summary">
                <div>
                    <strong>총 상품 금액:</strong> {totalAmount.toLocaleString()} 원
                </div>
                <div>
                    <strong>총 배송비:</strong> {totalShipping.toLocaleString()} 원
                </div>
                <div>
                    <strong>결제 예정 금액:</strong> {totalPayment.toLocaleString()} 원
                </div>
            </div>
            <div className="order-buttons">
                <Button variant="primary" className="mr-2">전체 상품 주문</Button>
                <Button variant="success" className="mr-2">선택 상품 주문</Button>
                <Button variant="danger" onClick={handleDeleteSelected}>선택 상품 삭제</Button>
            </div>
        </div>
    );
};

export default Cart;