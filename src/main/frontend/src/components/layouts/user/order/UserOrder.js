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

    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        address: '',
        phone: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setShippingInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        // 결제 처리 로직
        console.log('결제 처리:', shippingInfo);
    };

    const orderDetails = [
        {id: 1, name: '상품 1', price: 20000, quantity: 2},
        {id: 2, name: '상품 2', price: 30000, quantity: 1},
    ];

    const totalPayment = orderDetails.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <Container className="order-page">
            <h2 className="text-center">주문 정보 입력</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>주문자 이름</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="이름을 입력하세요"
                        name="name"
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
                        name="homePhone"
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
                        name="mobilePhone"
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

                <Button variant="primary" type="submit">
                    주문하기
                </Button>
                <Row className="mb-4">
                    <Col>
                        <h5>배송 정보</h5>

                        <Form.Group controlId="formName">
                            <Form.Label>받는 사람</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
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
                            <Form.Label>전화번호</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                // value={shippingInfo.phone}
                                onChange={handleChange}
                                placeholder="전화번호를 입력하세요"
                            />
                        </Form.Group>
                    </Col>
                </Row>
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