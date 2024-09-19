import React, {useEffect, useState} from 'react';
import {Button, Container, Form, Table} from 'react-bootstrap';
import {useParams} from "react-router-dom";
import axios from 'axios';
import {formatPrice} from "../../../../js/utils/formatUtils";

function ProductDetail() {

    const [resArr, setResArr] = useState([]);
    const params = useParams();

    useEffect(() => {
        axios.get('/admin/product/productDetail',
            {
                params: {id: params.id}
            }).then(response => {
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

    const [productKind, setProductKind] = useState(resArr.productKind);
    const options = [
        {value: 'clothing', label: '의류'},
        {value: 'electronics', label: '전자제품'},
        {value: 'books', label: '책'},
        {value: 'food', label: '식품'},
        {value: 'toys', label: '장난감'}
    ];

    return (
        <div className="divTable">
            <Container>
                <Form>
                    <Table striped bordered hover>
                        <tbody>
                        <tr>
                            <td><Form.Label>상품명</Form.Label></td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="상품명 입력"
                                    value={resArr.productNm || ''}
                                    readOnly
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><Form.Label>가격</Form.Label></td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="가격 입력"
                                    value={formatPrice(resArr.price)}
                                    readOnly
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><Form.Label>배송비</Form.Label></td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="가격 입력"
                                    value={formatPrice(resArr.shipping)}
                                    readOnly
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><Form.Label>상품설명</Form.Label></td>
                            <td>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    placeholder="상품설명 입력"
                                    value={resArr.content || ''}
                                    readOnly
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><Form.Label>상품종류</Form.Label></td>
                            <td>
                                <Form.Control
                                    as="select"
                                    style={{width: '100px', height: '35px'}}
                                    value={productKind || ''} /* 선택된 값을 상태로 설정 */
                                    onChange={(e) => setProductKind(e.target.value)} /* 선택된 값 업데이트 */
                                    disabled
                                >
                                    {options.map(option => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </Form.Control>
                            </td>
                        </tr>
                        <tr>
                            <td><Form.Label>작성자</Form.Label></td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="관리자"
                                    readOnly={true}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><Form.Label>이미지 첨부</Form.Label></td>
                            <td>
                                {/* 파일 정보 표시 */}
                                {resArr.fileNm && (
                                    <div>
                                        {resArr.filePath && (
                                            <img
                                                src={`${resArr.filePath}`}
                                                alt="미리보기"
                                                style={{width: '250px', height: '300px'}}
                                            />
                                        )}
                                        <p>파일명: {resArr.fileNm || ''}</p>
                                    </div>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" className="text-center">
                                <Button variant="primary" type="button" className="deleteBtn" href={'/productList'}>
                                    목록
                                </Button>
                                &nbsp;&nbsp;
                                <Button variant="primary" type="button" href={`/productModify/${resArr.id}`}>
                                    수정
                                </Button>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </Form>
            </Container>
        </div>
    );
}

export default ProductDetail;