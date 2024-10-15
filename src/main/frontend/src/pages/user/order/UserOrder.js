import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useLocation} from 'react-router-dom';
import {Button, Col, Container, Form, Row, Table} from 'react-bootstrap';
import {ValidateEmail, ValidatePhone} from 'utils/Validation';
import {FormatPhoneNumber} from 'utils/FormatPhoneNumber';
import DaumAddrAPI from 'components/daumAddrApi/DaumAddrAPI';
import axios from "axios";
import './UserOrder.css';
import UseIamport from "../payment/Iamport";
import Payment from "../payment/Payment";

const Order = () => {
    const {register, handleSubmit, setValue, setError, clearErrors, formState: {errors}} = useForm();
    const location = useLocation();

    /* 장바구니에서 전달 된 파라미터 */
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const cartItemIds = queryParams.get('cartItemIds'); /* 장바구니에 담긴 상품 */

    const [resArr, setResArr] = React.useState([]);
    const [domain, setDomain] = useState('gmail.com');
    const [customDomain, setCustomDomain] = useState(''); /* 직접 입력된 도메인 상태 */

    /* 구매하기에서 전달 된 데이터 */
    const buyProduct = { ...location.state };

    /* 장바구니 상품 조회 */
    useEffect(() => {
        const fetchData = async () => {
            try {
                /* 장바구니 */
                if(cartItemIds) {
                    const response = await axios.get('/user/order/orderCartItemDetail', {
                        params: {id, cartItemIds},
                    });
                    setResArr(response.data);
                    setValue('id', id); // Set the order ID
                }
                /* 구매하기 */
                //if (Object.keys(buyProduct).length > 0) {
                if (buyProduct){
                    setResArr([buyProduct]); /* 배열 형태로 저장 */
                }
            } catch (error) {
                console.error("Error fetching fetchData", error);
            }
        };
        fetchData();
    }, [id, cartItemIds, setValue]);

    /* 연락처 포맷팅 */
    const handlePhoneChange = (e) => {
        const {name, value} = e.target;
        const formattedValue = FormatPhoneNumber(value);
        setValue(name, formattedValue);
    };

    /* 이메일 도메인 동적 처리 */
    const handleDomainChange = (e) => {
        const selectedDomain = e.target.value;
        setDomain(selectedDomain);
        clearErrors('emailDomain'); /* 도메인 에러 삭제 */

        /* 선택된 도메인에 따라 입력 필드 값 업데이트 */
        if (selectedDomain !== 'custom') {
            setCustomDomain(selectedDomain); /* 선택된 도메인 설정 */
            setValue('emailDomain', selectedDomain);
        } else {
            setCustomDomain(''); /* 직접 입력일 경우 비워줌 */
            setValue('emailDomain', ''); /* 빈값으로 초기화 */
        }
    };

    /* 총 결제금액*/
    const totalPayment = resArr.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const onSubmit = async (data) => {
        clearErrors();

        const email = `${data.emailId}@${data.emailDomain || domain}`;
        const addr = `${data.address1} ${data.address2}`;

        /* 입력값 유효성 검사 */
        if (!data.orderer) {
            setError("orderer", {type: "manual", message: "주문자를 입력해주십시오."});
            return;
        }
        if (!data.phone) {
            setError("phone", {type: "manual", message: "연락처는 필수입니다."});
            return;
        }
        if (!ValidatePhone(data.phone)) {
            setError("phone", {type: "manual", message: "연락처를 다시 입력해주십시오. (ex: 010-1234-5678)"});
            return;
        }
        if (!ValidateEmail(email)) {
            setError("email", {type: "manual", message: "이메일 주소를 다시 입력해주십시오."});
            return;
        }
        if (!data.recipient) {
            setError("recipient", {type: "manual", message: "받는분은 필수입니다."});
            return;
        }
        if (!data.zonecode) {
            setError("address", {type: "manual", message: "주소는 필수입니다."});
            return;
        }
        if (!data.recipientPhone) {
            setError("recipientPhone", {type: "manual", message: "받는분의 연락처는 필수입니다."});
            return;
        }
        if (!ValidatePhone(data.recipientPhone)) {
            setError("recipientPhone", {type: "manual", message: "받는분의 연락처를 다시 입력해주십시오. (ex: 010-1234-5678)"});
            return;
        }

        try {
            const response = await axios.post('/user/order/insertOrder', {
                ...data,
                email,
                addr,
                totalPayment,
                orderDetails: resArr,
            });

            const orderId = response.data.orderId;

            UseIamport();
            Payment(orderId);

            alert("주문이 완료되었습니다.");
            // navigate('/productList');
        } catch (error) {
            console.error('Error submitting post: ', error);
        }
    };

    return (
        <Container className="order-page">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-center">주문서</h2>

                <Form.Group as={Row} controlId="formName">
                    <Form.Label column sm={2}>주문자</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="이름을 입력하세요"
                            {...register("orderer", {required: "주문자를 입력해주십시오."})}
                        />
                        {errors.orderer && <p style={{color: 'red'}}>{errors.orderer.message}</p>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formMobilePhone">
                    <Form.Label column sm={2}>연락처</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="tel"
                            placeholder="휴대전화 번호를 입력하세요"
                            {...register("phone", {required: "연락처는 필수입니다."})}
                            onChange={handlePhoneChange}
                        />
                        {errors.phone && <p style={{color: 'red'}}>{errors.phone.message}</p>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formEmail">
                    <div className="email-form-container">
                        <Form.Label column sm={2}>이메일</Form.Label>
                        {/*<Col sm={3}>*/}
                        <Form.Control
                            type="text"
                            placeholder="이메일 아이디를 입력하세요"
                            {...register("emailId", {required: "이메일 아이디는 필수입니다."})}
                        />
                        {errors.emailId && <p style={{color: 'red'}}>{errors.emailId.message}</p>}
                        @
                        {/*</Col>*/}
                        {/*<Col sm={3}>*/}
                        <Form.Control
                            type="text"
                            placeholder="도메인을 입력하세요"
                            {...register("customDomain", {required: domain === 'custom' ? "도메인을 입력하세요." : false})}
                            onChange={(e) => setCustomDomain(e.target.value)}
                            value={domain === 'custom' ? customDomain : customDomain || domain}
                        />
                        {errors.customDomain && <p style={{color: 'red'}}>{errors.customDomain.message}</p>}
                        {/*</Col>*/}
                        {/*<Col sm={4}>*/}
                        <Form.Control
                            as="select"
                            {...register("emailDomain", {required: "도메인은 필수입니다."})}
                            onChange={handleDomainChange}
                            value={domain}
                        >
                            <option value="gmail.com">gmail.com</option>
                            <option value="naver.com">naver.com</option>
                            <option value="daum.net">daum.net</option>
                            <option value="yahoo.com">yahoo.com</option>
                            <option value="outlook.com">outlook.com</option>
                            <option value="custom">직접 입력</option>
                        </Form.Control>
                        {errors.emailDomain && <p style={{color: 'red'}}>{errors.emailDomain.message}</p>}
                        {/*</Col>*/}
                    </div>
                </Form.Group>

                <h2 className="text-center">배송지</h2>
                <Form.Group as={Row} controlId="formName">
                    <Form.Label column sm={2}>받는분</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            {...register("recipient", {required: "받는분은 필수입니다."})}
                            placeholder="이름을 입력하세요"
                        />
                        {errors.recipient && <p style={{color: 'red'}}>{errors.recipient.message}</p>}
                    </Col>
                </Form.Group>

                <Form.Group controlId="formAddress">
                    <Form.Group as={Row} controlId="formGridAddress">
                        <Form.Label column sm={2}>주소</Form.Label>
                        <Col sm={10}>
                            <DaumAddrAPI onChange={(zonecode, address) => {
                                setValue('zonecode', zonecode);
                                setValue('address1', address);
                            }}/>
                            <Form.Control
                                type="text"
                                {...register("address2", {required: "주소는 필수입니다."})}
                                placeholder="상세주소"
                            />
                            {errors.address2 && <p style={{color: 'red'}}>{errors.address2.message}</p>} {}
                        </Col>
                    </Form.Group>
                </Form.Group>

                <Form.Group as={Row} controlId="formPhone">
                    <Form.Label column sm={2}>배송 연락처</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            {...register("recipientPhone", {required: "받는분의 연락처는 필수입니다."})}
                            placeholder="전화번호를 입력하세요"
                            onChange={handlePhoneChange}
                        />
                        {errors.recipientPhone && <p style={{color: 'red'}}>{errors.recipientPhone.message}</p>}
                    </Col>
                </Form.Group>

                <div className="text-center">
                    <Button variant="success" type="submit">
                        결제하기
                    </Button>
                </div>
            </Form>

            <h5>주문 내역</h5>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>상품명</th>
                    <th>색상</th>
                    <th>사이즈</th>
                    <th>가격</th>
                    <th>수량</th>
                    <th>총액</th>
                </tr>
                </thead>
                <tbody>
                {resArr && resArr.map((item) => (
                    <tr key={item.productId}>
                        <td>{item.productNm}</td>
                        <td>{item.color}</td>
                        <td>{item.size}</td>
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
        </Container>
    );
};

export default Order;