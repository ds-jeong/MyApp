import React, {useEffect, useState} from 'react';
import {Button, Table, Form, Container, Row, Col} from 'react-bootstrap';
import {useLocation} from 'react-router-dom';
import './UserOrder.css';
import axios from "axios";

const Order = () => {
    
    const [resArr, setResArr] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const cartItemIds = queryParams.get('cartItemIds');

    /* 선택한 장바구니 상품 조회 */
    useEffect(() => {
        fetchData(id, cartItemIds);
    }, [id, cartItemIds]);

    const fetchData = async (id, cartItemIds) => {
        try {
            const response = await axios.get('/user/order/orderCartItemDetail', {
                params: {
                    id: id,
                    cartItemIds: cartItemIds
                },
            });
            setResArr(response.data);
        } catch (error) {
            console.error("Error fetching fetchData", error);
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value  /* 각 입력 필드의 name 속성을 키로 사용하여 값을 설정 */
        });
    };

    /* 총 결제금액*/
    const totalPayment = resArr.reduce((sum, item) => sum + item.price * item.quantity, 0);

    /* formData 셋팅 */
    const [formData, setFormData] = useState({
        orderer: '',
        tel: '',
        phone: '',
        email: '',
        recipient: '',
        recipientPhone: '',
        totalPayment: '',
        id: id,
        orderDetails: [],
    });

    const handleSubmit = event => {
        event.preventDefault();

        formData.totalPayment = totalPayment;
        formData.orderDetails = resArr

        axios.post('/user/order/insertOrder', formData)
            .then(response => {
                alert("주문확인!");
                // useHistory import 안되면 아래 코드로 수정해서 반영
                // 응답을 받고 제품 등록화면으로 돌아감
                // navigate('/productList');
            })
            .catch(error => {
                console.error('Error submitting post: ', error);
            });
    };

    return (
        <Container className="order-page">
            <Form onSubmit={handleSubmit}>

                {/* 주문 정보 */}
                <h2 className="text-center">주문 정보</h2>
                <Form.Group controlId="formName">
                    <Form.Label>주문자 이름</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="이름을 입력하세요"
                        name="orderer"
                        // value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formHomePhone">
                    <Form.Label>일반 전화</Form.Label>
                    <Form.Control
                        type="tel"
                        placeholder="전화번호를 입력하세요"
                        name="tel"
                        // value={formData.homePhone}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formMobilePhone">
                    <Form.Label>휴대 전화</Form.Label>
                    <Form.Control
                        type="tel"
                        placeholder="휴대전화 번호를 입력하세요"
                        name="phone"
                        // value={formData.mobilePhone}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>이메일</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="이메일을 입력하세요"
                        name="email"
                        // value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* 배송 정보 */}
                <h2 className="text-center">배송 정보</h2>
                <Form.Group controlId="formName">
                    <Form.Label>받는 사람</Form.Label>
                    <Form.Control
                        type="text"
                        name="recipient"
                        // value={shippingInfo.name}
                        onChange={handleChange}
                        placeholder="이름을 입력하세요"
                    />
                </Form.Group>
                <Form.Group controlId="formAddress">
                    <Form.Label>배송 주소</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        // value={shippingInfo.address}
                        onChange={handleChange}
                        placeholder="주소를 입력하세요"
                    />
                </Form.Group>
                <Form.Group controlId="formPhone">
                    <Form.Label>연락처</Form.Label>
                    <Form.Control
                        type="text"
                        name="recipientPhone"
                        // value={shippingInfo.phone}
                        onChange={handleChange}
                        placeholder="전화번호를 입력하세요"
                    />
                </Form.Group>
            </Form>

            <h5>주문 내역</h5>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>상품명</th>
                    <th>가격</th>
                    <th>수량</th>
                    <th>총액</th>
                </tr>
                </thead>
                <tbody>
                {resArr.map((item) => (
                    <tr key={item.productId}>
                        <td>{item.productNm}</td>
                        <td>{item.price.toLocaleString()} 원</td>
                        <td>{item.quantity}</td>
                        <td>{(item.price * item.quantity).toLocaleString()} 원</td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <div className="total-summary">
                <h5>결제 예정 금액: {totalPayment.toLocaleString()} 원</h5>
            </div>

            <div className="text-center">
                <Button variant="success" onClick={handleSubmit}>
                    결제하기
                </Button>
            </div>
        </Container>
    );
};

export default Order;