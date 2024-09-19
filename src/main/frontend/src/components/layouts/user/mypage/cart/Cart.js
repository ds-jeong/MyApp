import React, {useEffect, useState} from 'react';
import {Button, Form, Table} from 'react-bootstrap';
import './Cart.css';
import axios from "axios";

const Cart = () => {

    /* localStorage에 저장된 사용자의 정보 */
    const userDataStr = window.localStorage.getItem('userData');

    /* Json으로 파싱 */
    const userData = JSON.parse(userDataStr);

    /* 파싱한 데이터를 변수에 저장 */
    const userInfo = userData?.userInfo;

    /* 장바구니 조회 */
    const id = userInfo.id;
    const [resArr, setResArr] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.post(`/user/cart/cartItemList?id=${id}`);
            setResArr(response.data);
        } catch (error) {
            console.error("Error fetching fetchData", error);
        }
    };

    const [selectedResArr, setSelectedResArr] = useState({});
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalShipping, setTotalShipping] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);

    const calculateTotals = (items) => {
        let amount = 0;
        let shipping = 0;
        items.forEach(item => {
            amount += item.price * item.quantity;
            // shipping += item.shippingFee;
             shipping += 2500;
        });
        setTotalAmount(amount);
        setTotalShipping(shipping);
        setTotalPayment(amount + shipping);
    };

    const handleSelectItem = (cartItemId) => {
        setSelectedResArr(prev => ({
            ...prev,
            [cartItemId]: !prev[cartItemId],
        }));
    };

    const handleQuantityChange = (cartItemId, quantity) => {
        setResArr(prev =>
            prev.map(item =>
                item.cartItemId === cartItemId ? { ...item, quantity } : item
            )
        );
        calculateTotals(resArr);
    };

    /* 장바구니 개별 상품 삭제 */
    const handleDeleteCartItem= async (cartItemId) => {
        if(window.confirm("삭제하시겠습니까?")) {
            await axios.post(`/user/cart/deleteCartItem?cartItemId=${cartItemId}`);
            setResArr(prev => prev.filter(item => item.cartItemId !== cartItemId));
            calculateTotals(resArr);
            alert("삭제되었습니다");
        }
    };

    /* 장바구니 선택 상품 삭제 */
    const handleDeleteCartItemSelected = async () => {
        const selectedIds = Object.keys(selectedResArr)
            .filter(key => selectedResArr[key])
            .map(id => Number(id)); /* 문자열을 숫자로 변환 */
        if(window.confirm("선택한 상품을 삭제하시겠습니까?")) {
            await axios.post('/user/cart/deleteCartItemselected', { cartItemIds: selectedIds });
            setResArr(prev => prev.filter(item => !selectedIds.includes(item.productId.toString())));
            calculateTotals(resArr);
                alert("삭제되었습니다");
        }
    };

    /* order와 같이 진행 */
    const handleOrderAll = async () => {
        await axios.post('/user/cart/order', { productIds: resArr.map(item => item.productId) }); // 전체 상품 주문 API 호출
        alert("전체 상품이 주문되었습니다.");
    };

    /* order와 같이 진행 */
    const handleOrderSelected = async () => {
        const selectedIds = Object.keys(selectedResArr).filter(key => selectedResArr[key]);
        await axios.post('/user/cart/order-selected', { productIds: selectedIds }); // 선택한 상품 주문 API 호출
        alert("선택한 상품이 주문되었습니다.");
    };

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
                {resArr && resArr.map((item) => (
                    <tr key={item.cartItemId}>
                        <td>
                            <Form.Check
                                type="checkbox"
                                checked={selectedResArr[item.cartItemId] || false}
                                onChange={() => handleSelectItem(item.cartItemId)}
                                // checked={selectedResArr[item.productId] || false}
                                // onChange={() => handleSelectItem(item.id)}
                            />
                        </td>
                        <td>{item.productNm}</td>
                        <td>{item.price} 원</td>
                        <td>
                            <Form.Control
                                type="number"
                                value={item.quantity}
                                min="1"
                                onChange={(e) => handleQuantityChange(item.cartItemId, Number(e.target.value))}
                                // min="1"
                                // onChange={(e) => handleQuantityChange(item.productId, Number(e.target.value))}
                            />
                        </td>
                        <td>{item.shippingFee} 원</td>
                        <td>
                            <Button variant="danger" onClick={() => handleDeleteCartItem(item.cartItemId)}>삭제</Button>
                            {/*<Button variant="danger" onClick={() => handleDeleteSelected(item.productId)}>삭제</Button>*/}
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
                <Button variant="primary" className="mr-2" onClick={handleOrderAll}>전체 상품 주문</Button>
                <Button variant="success" className="mr-2" onClick={handleOrderSelected}>선택 상품 주문</Button>
                <Button variant="danger" onClick={handleDeleteCartItemSelected}>선택 상품 삭제</Button>
                {/*<Button variant="primary" className="mr-2">전체 상품 주문</Button>*/}
                {/*<Button variant="success" className="mr-2">선택 상품 주문</Button>*/}
                {/*<Button variant="danger" onClick={handleDeleteSelected}>선택 상품 삭제</Button>*/}
            </div>
        </div>
    );
};

export default Cart;