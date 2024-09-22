import React, {useEffect, useState, useRef} from 'react';
import {useLocation} from 'react-router-dom';
import {Button, Col, Container, Form, Row, Table} from 'react-bootstrap';
import {ValidateEmail, ValidatePhone} from 'components/Validation';
import DaumAddrAPI from 'components/DaumAddrAPI';
import axios from "axios";
import './UserOrder.css';


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

    /* 총 결제금액*/
    const totalPayment = resArr.reduce((sum, item) => sum + item.price * item.quantity, 0);

    /* formData 셋팅 */
    const [formData, setFormData] = useState({
        orderer: '',
        tel: '',
        phone: '',
        email: '',
        emailId: '',
        customDomain: 'gmail.com',
        recipient: '',
        recipientPhone: '',
        totalPayment: '',
        zonecode: '',
        addr: '',
        address1: '',
        address2: '',
        id: id,
        orderDetails: [],
    });

    const handleChange = (e) => {
        const {name, value} = e.target;

        /* 연락처 포맷팅 */
        let formattedValue = value;

        if (name === 'phone' || name === 'recipientPhone') {
            /* 숫자만 남기기 */
            const numericValue = value.replace(/\D/g, '');
            /* 포맷팅 */
            if (numericValue.length < 3) {
                formattedValue = numericValue; // 첫 3자리
            } else if (numericValue.length <= 7) {
                formattedValue = `${numericValue.slice(0, 3)}-${numericValue.slice(3)}`; /* 3-4자리 */

            } else {
                formattedValue = `${numericValue.slice(0, 3)}-${numericValue.slice(3, 7)}-${numericValue.slice(7, 11)}`; /* 전체 포맷 */
            }
        }
        setFormData({
            ...formData,
            [name]: formattedValue,  /* 포맷된 값을 설정 */
        });
    };

    /* 이메일 도메인 동적 처리 */
    const [domain, setDomain] = useState('gmail.com');
    const handleDomainChange = (e) => {
        const selectedDomain = e.target.value;
        setDomain(selectedDomain);

        /* "직접 입력"이 선택되면 입력값 초기화 */
        if (selectedDomain === 'custom') {
            formData.customDomain = '';
        } else {
            /* 선택된 도메인을 입력 박스에 표시 */
            formData.customDomain = selectedDomain;
        }
    };

    /* 주소 API에서 전달받은 결과값 */
    const handleAddressChange = (zonecode, address) => {
        /* 우편번호 */
        formData.zonecode = zonecode;
        /* 주소 */
        formData.address1 = address;
    };

    const [ordererError, setOrdererError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [recipientError, setRecipientError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [recipientPhoneError, setRecipientPhoneError] = useState('');

    const refs = {
        ordererRef: useRef(null),
        phoneRef: useRef(null),
        emailRef: useRef(null),
        recipientRef: useRef(null),
        address2Ref: useRef(null),
        recipientPhoneRef: useRef(null),
    };
    const handleSubmit = event => {
        event.preventDefault();

        /* 이메일 */
        formData.email = formData.emailId + '@' + formData.customDomain;
        /* 파싱한 주소와 상세주소를 합쳐서 주소에 저장 */
        formData.addr = formData.address1 + ' ' + formData.address2;
        /* 결제가격 */
        formData.totalPayment = totalPayment;
        /* 주문상세 */
        formData.orderDetails = resArr

        /* 주문자 */
        if (!formData.orderer) {
            setOrdererError("주문자를 입력해주십시오.");
            refs.ordererRef.current.focus(); /* 입력란에 포커스 맞추기 */
            return false;
        }

        /* 연락처 */
        if (!formData.phone) {
            setPhoneError("연락처는 필수로 입력해주십시오.");
            refs.phoneRef.current.focus();
            return false;
        } else if (!ValidatePhone(formData.phone)) {
            setPhoneError("연락처를 다시 입력해주십시오. (ex: 010-1234-5678)");
            refs.phoneRef.current.focus();
            return false;
        }

        /* 이메일 */
        if (!ValidateEmail(formData.email)) {
            setEmailError("이메일 주소를 다시 입력해주십시오.");
            refs.emailRef.current.focus();
            return false;
        }

        /* 받는분 */
        if (!formData.recipient) {
            setRecipientError("받는분는 필수입니다.");
            refs.phoneRef.current.focus();
            return false;
        }

        /* 주소 */
        if (!formData.zonecode) { /* API와의 연동으로 우편번호의 유무로 판단 */
            setAddressError("주소는 필수입니다.");
            refs.address2Ref.current.focus();
            return false;
        }

        /* 받는분 연락처 */
        if (!formData.recipientPhone) {
            setRecipientPhoneError("받는분의 연락처는 필수입니다.");
            refs.recipientPhoneRef.current.focus();
            return false;
        }else if (!ValidatePhone(formData.recipientPhone)) {
            setRecipientPhoneError("연락처를 다시 입력해주십시오. (ex: 010-1234-5678)");
            refs.recipientPhoneRef.current.focus();
            return false;
        }

        /* 결제 */
        axios.post('/user/order/insertOrder', formData)
            .then(response => {
                alert("주문이 완료되었습니다.");
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
                <h2 className="text-center">주문서</h2>
                <Form.Group as={Row} controlId="formName">
                    <Form.Label column sm={2}>주문자</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="이름을 입력하세요"
                            value={formData.orderer}
                            name="orderer"
                            onChange={handleChange}
                            required
                            ref={refs.ordererRef}
                        />
                        {ordererError && <p style={{color: 'red'}}>{ordererError}</p>}
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formMobilePhone">
                    <Form.Label column sm={2}>연락처</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="tel"
                            placeholder="휴대전화 번호를 입력하세요"
                            value={formData.phone}
                            name="phone"
                            onChange={handleChange}
                            required
                            ref={refs.phoneRef}
                        />
                        {phoneError && <p style={{color: 'red'}}>{phoneError}</p>}
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formEmail">
                    <Form.Label column sm={2}>이메일</Form.Label>
                    <Col sm={10}>
                        <div className="email-form-container">
                            <Form.Control
                                type="text"
                                placeholder="이메일을 입력하세요"
                                value={formData.emailId}
                                name="emailId"
                                onChange={handleChange}
                                required
                                ref={refs.emailRef}
                            />
                            @
                            <Form.Control
                                type="text"
                                placeholder="도메인 입력"
                                value={domain === 'custom' ? formData.customDomain : domain}
                                name="customDomain"
                                onChange={handleChange}
                                className="domain-input"
                            />
                            <Form.Control
                                as="select"
                                value={domain}
                                onChange={handleDomainChange}>
                                <option value="gmail.com">gmail.com</option>
                                <option value="naver.com">naver.com</option>
                                <option value="daum.net">daum.net</option>
                                <option value="yahoo.com">yahoo.com</option>
                                <option value="outlook.com">outlook.com</option>
                                <option value="custom">직접 입력</option>
                                {/* 직접 입력 옵션 추가 */}
                            </Form.Control>
                        </div>
                        {emailError && <p style={{color: 'red'}}>{emailError}</p>}
                    </Col>
                </Form.Group>


                {/* 배송 정보 */}
                <h2 className="text-center">배송지</h2>
                <Form.Group as={Row} controlId="formName">
                    <Form.Label column sm={2}>받는분</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            name="recipient"
                            onChange={handleChange}
                            placeholder="이름을 입력하세요"
                            ref={refs.recipientRef}
                        />
                        {recipientError && <p style={{color: 'red'}}>{recipientError}</p>}
                    </Col>
                </Form.Group>
                <Form.Group controlId="formAddress">
                    <Form.Group as={Row} controlId="formGridAddress">
                        <Form.Label column sm={2}>주소</Form.Label>
                        <Col sm={10}>
                            <DaumAddrAPI onChange={handleAddressChange}/>
                            <Form.Control
                                type="text"
                                name="address2"
                                onChange={handleChange}
                                placeholder="싱세주소"
                                ref={refs.address2Ref}
                            />
                            {addressError && <p style={{color: 'red'}}>{addressError}</p>}
                        </Col>
                    </Form.Group>
                </Form.Group>
                <Form.Group as={Row} controlId="formPhone">
                    <Form.Label column sm={2}>배송 연락처</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            name="recipientPhone"
                            onChange={handleChange}
                            placeholder="전화번호를 입력하세요"
                            ref={refs.recipientPhoneRef}
                        />
                        {recipientPhoneError && <p style={{color: 'red'}}>{recipientPhoneError}</p>}
                    </Col>
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
                {resArr && resArr.map((item) => (
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