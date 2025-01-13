import React, {useEffect, useState} from 'react';
import {Button, Form, Table} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
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
            const response = await axios.post(`/api/user/cart/cartItemList?id=${id}`);
            setResArr(response.data);
        } catch (error) {
            console.error("Error fetching fetchData", error);
        }
    };

    const [selectedResArr, setSelectedResArr] = useState({});
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalShipping, setTotalShipping] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);

    /* 총 금액 계산 */
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

    /* 선택 된 item */
    const [selectedIds, setSelectedIds] = useState([]);

    /* 체크박스 상태관리 */
    const handleChangeCheck = (checked, item) => {
        if (checked) {
            /* 체크박스가 선택된 경우: item을 배열에 추가 */
            setSelectedIds((prev) => [...prev, item.cartItemId]);
        } else {
            /* 체크박스가 선택 해제된 경우: item을 배열에서 제거 */
            setSelectedIds((prev) => prev.filter((id) => id !== item.cartItemId));
        }
    };

    /* 수량 변경  */
    const handleQuantityChange = (cartItemId, quantity) => {
        setResArr(prev => {
            const updatedItems = prev.map(item =>
                item.cartItemId === cartItemId ? { ...item, quantity } : item
            );

            /* 총합 계산 */
            calculateTotals(updatedItems); /* 수정된 배열을 사용하여 총합 계산 */

            return updatedItems; /* 변경된 배열 반환 */
        });
    };

    /* 장바구니 개별 상품 삭제 */
    const handleDeleteCartItem= async (cartItemId) => {
        if(window.confirm("삭제하시겠습니까?")) {
            await axios.post(`/api/user/cart/deleteCartItem?cartItemId=${cartItemId}`);
            setResArr(prev => prev.filter(item => item.cartItemId !== cartItemId));
            calculateTotals(resArr);
            alert("삭제되었습니다");
            window.location.replace("/");
        }
    };

    /* 장바구니 선택 상품 삭제 */
    const handleDeleteCartItemSelected = async () => {
        if(window.confirm("선택한 상품을 삭제하시겠습니까?")) {
            await axios.post('/api/user/cart/deleteCartItemselected', selectedIds, {
                headers: {
                    'Content-Type': 'application/json'
                }});
            setResArr(prev => prev.filter(item => !selectedIds.includes(item.productId.toString())));
            calculateTotals(resArr);
            alert("삭제되었습니다");
            window.location.replace("/");
        }
    };

    const navigate = useNavigate();

    /* 장바구니 모든 item */
    const [allCartItemIds, setAllProductIds] = useState([]);
    const [allCartItemQuantitys, setAllCartItemQuantitys] = useState([]);


    /* 장바구니 전체 상품 주문  */
    const handleOrderCartItemAll = async () => {
        resArr.forEach(item => {
            allCartItemIds.push(item.cartItemId);
            allCartItemQuantitys.push(item.quantity);
        });
        if (allCartItemIds.length <= 0){
            alert("장바구니에 상품을 담아주세요.");
        }else{
            navigate(`/userOrder?id=${id}&cartItemIds=${allCartItemIds.join(',')}&cartItemQuantitys=${allCartItemQuantitys.join(',')}`);
        }
    };

    /* 장바구니 선택 상품 주문 */
    const handleOrderCartItemSelected = async () => {
        // if(selectedIds.length <= 0){
        //     alert("상품을 선택해주세요.");
        // }else{
        //     navigate(`/userOrder?id=${id}&cartItemIds=${selectedIds.join(',')}`);
        // }
        if (selectedIds.length <= 0) {
            alert("상품을 선택해주세요.");
        } else {
            const selectedQuantities = selectedIds.map(id => {
                const item = resArr.find(item => item.cartItemId === id);
                return item ? item.quantity : 0;
            });
            navigate(`/userOrder?id=${id}&cartItemIds=${selectedIds.join(',')}&cartItemQuantitys=${selectedQuantities.join(',')}`);
        }
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
                                checked={selectedIds.includes(item.cartItemId)}
                                onChange={(e) => handleChangeCheck(e.target.checked, item)}
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
                            />
                        </td>
                        <td>{item.shippingFee} 원</td>
                        <td>
                            <Button variant="danger" onClick={() => handleDeleteCartItem(item.cartItemId)}>삭제</Button>
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
                <Button variant="primary" className="mr-2" onClick={handleOrderCartItemAll}>전체 상품 주문</Button>
                <Button variant="success" className="mr-2" onClick={handleOrderCartItemSelected}>선택 상품 주문</Button>
                <Button variant="danger" onClick={handleDeleteCartItemSelected}>선택 상품 삭제</Button>
            </div>
        </div>
    );
};

export default Cart;