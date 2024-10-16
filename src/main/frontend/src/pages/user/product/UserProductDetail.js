import React, {useEffect, useState, useRef} from 'react';
import {Container, Row, Col, Button, Image, Form, CardImg, FormControl} from 'react-bootstrap';
import {useParams} from "react-router-dom";
import {formatPrice} from '../../../utils/formatUtils';
import CartPopup from './popup/CartPopup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProductDetail() {

    /* localStorage에 저장된 사용자의 정보 */
    const userDataStr = window.localStorage.getItem('userData');

    /* Json으로 파싱 */
    const userData = JSON.parse(userDataStr);

    /* 파싱한 데이터를 변수에 저장 */
    const userInfo = userData?.userInfo;
    const id = userInfo?.id;

    /* 상품 조회 */
    const [resArr, setResArr] = useState([]);

    const params = useParams();

    useEffect(() => {
        axios.get(`/user/product/userProductDetail?id=${params.id}`).then(response => {
                setResArr(response.data);
            }
        )
            .catch(error => console.log(error))
    }, []);

    const defaultImg = `${process.env.PUBLIC_URL}/404.jpg`;

    /* 이미지 로드 오류 발생 시 기본 이미지로 교체 */
    const handleImgError = (e) => {
        e.target.src = defaultImg;
    };

    /* 수량 핸들러 */
    const [quantity, setQuantity] = useState(1);

    const handleIncrease = () => setQuantity(quantity + 1);
    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    /* 장바구니 팝업 */

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    /* 장바구니 담기 */

    const productNmRef = useRef(null);
    const quantityRef = useRef(null);
    const priceRef = useRef(0);

    const handleAddCart = (productId) => {

        // 로그인 체크
        if (!id) {
            alert("로그인 후 이용하세요.");
            return; // 로그인하지 않은 경우 함수 종료
        }

        // console.log('id : ', id);
        // console.log('productId : ', productId);
        // console.log('price: ', priceRef.current.value);
        // console.log('Quantity:', quantity);

        const formData = new FormData();

        formData.append('id', id);
        formData.append('productId', productId);
        formData.append('price', priceRef.current.value);
        formData.append('quantity', quantityRef.current.value);

        /* 비동기식 코드지만 요청완료를 기다리지않고 다음 코드를 진행함 */
        axios.post('/user/cart/insertCart', formData)
            .then(response => {
                //alert("장바구니에 담겼습니다");
                handleOpenPopup();
                /* useHistory import 안되면 아래 코드로 수정해서 반영 */
                /* 응답을 받고 제품 등록화면으로 돌아감 */
            })
            .catch(error => {
                console.error('Error submitting post: ', error);
            });
    };

    /* 구매하기 */

    //const [productKind, setProductKind] = useState(resArr.productKind);
    const sizeRef = useRef(null);
    const colorRef = useRef(null);

    /* 예시 데이터 추후 삭제 코드 */
    const sizeOptions = [
        {value: '', label: 'Size'},
        {value: '225', label: '225'},
        {value: '230', label: '230'},
        {value: '235', label: '235'},
        {value: '240', label: '240'},
        {value: '245', label: '245'}
    ];

    const colorOptions = [
        {value: '', label: 'Color'},
        {value: 'red', label: 'red'},
        {value: 'blue', label: 'blue'},
        {value: 'black', label: 'black'},
        {value: 'white', label: 'white'},
        {value: 'pink', label: 'pink'}
    ];

    const navigate = useNavigate();
    const handleBuy = (productId) => {

        /* 로그인 체크 */
        if (!id) {
            alert("로그인 후 이용하세요.");
            return;
        }
        const size = sizeRef.current.value;
        const color = colorRef.current.value;
        const productNm = productNmRef.current.value;
        const price = priceRef.current.value;

        // console.log('id : ', userInfo?.id);
        // console.log('productId : ', productId);
        // console.log('size : ', size);
        // console.log('color : ', color);
        // console.log('productNm: ', productNm);
        // console.log('price: ', price);
        // console.log('Quantity:', quantity);

        if (!size){
            alert("사이즈를 선택해주세요");
            return;
        }

        if (!color){
            alert("색상을 선택해주세요");
            return;
        }

        /* 바로 구매하기는 별도의 데이터 통신 없이 화면간 데이터 전달로 처리 */
        navigate('/userOrder', {
            state: {
                id: id,
                productId: productId,
                // size: sizeRef.current.value,
                // color: colorRef.current.value,
                productNm: productNmRef.current.value,
                price: priceRef.current.value,
                quantity: quantityRef.current.value,
            },
        });
    };

    return (
        <Container>
            <Form>
                <Row className="mt-4">
                    {/* 왼쪽: 상품 이미지 */}
                    <Col md={6}>
                        <CardImg
                            src={`${resArr.filePath}`}
                            alt="Product Image"
                            className="product-image"
                        />
                    </Col>
                    {/* 오른쪽: 상품명, 가격, 수량 조정 */}
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label column={resArr.productNm}>
                                <h1>{resArr.productNm}</h1>
                            </Form.Label>
                            <Form.Control
                                type="hidden"
                                value={`${resArr.productNm}`}
                                readOnly
                                ref={productNmRef}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{formatPrice(resArr.price)}원</Form.Label>
                            <Form.Control
                                type="hidden"
                                value={`${resArr.price}`}
                                readOnly
                                ref={priceRef}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>배송비 : {formatPrice(resArr.shipping)}원</Form.Label>
                            <Form.Control
                                type="hidden"
                                value={`${resArr.shipping}`}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                as="select"
                                ref={sizeRef}
                                defaultValue={sizeOptions[0].value} // 기본값 설정 (옵션 중 하나)
                                //disabled
                            >
                                {sizeOptions.map(option => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                as="select"
                                ref={colorRef}
                                defaultValue={colorOptions[0].value} // 기본값 설정 (옵션 중 하나)
                                //disabled
                            >
                                {colorOptions.map(option => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <div className="quantity-controls">
                            <Button variant="outline-secondary" onClick={handleDecrease}>
                                -
                            </Button>
                            <Form.Control
                                type="text"
                                value={quantity}
                                readOnly
                                ref={quantityRef}
                            />
                            <Button variant="outline-secondary" onClick={handleIncrease}>
                                +
                            </Button>
                        </div>
                        <Button variant="primary" className="mt-3" onClick={() => handleAddCart(`${resArr.productId}`)}>
                            장바구니 담기
                        </Button>
                        <CartPopup isOpen={isPopupOpen} onClose={handleClosePopup}/>
                        &nbsp;
                        <Button variant="primary" className="mt-3" onClick={() => handleBuy(`${resArr.productId}`)}>
                            구매하기
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default ProductDetail;