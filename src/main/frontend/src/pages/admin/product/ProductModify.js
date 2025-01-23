import React, {useEffect, useRef, useState} from 'react';
import {Button, Container, Form, Table} from 'react-bootstrap';
import {useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import {addCommasToPrice} from "../../../utils/formatUtils";

function ProductModify() {

    const params = useParams();

    /* 입력 필드 값을 상태로 관리 */
    const [inputValue, setInputValue] = useState({
        productNm: '',
        price: '',
        shipping : '',
        content: '',
        author: '',
        file: '',
        filePath: '',
    });

    const { productNm, price, shipping, content, author,file } = inputValue;
    const handleChange = (e) => {
        /* input 요소의 name 속성과 value를 가져옴 */
        const { name, value } = e.target;

        // /* price 필드인 경우 formatPrice 함수를 적용하여 값 변환 */
        // const updatedValue = name === 'price' ? addCommasToPrice(value) : value;

        /* price or shipping 필드인 경우 formatPrice 함수를 적용하여 값 변환 */
        const updatedValue = (name === 'price' || name === 'shipping') ? addCommasToPrice(value) : value;

        /* 상태를 업데이트 */
        setInputValue({
            ...inputValue,
            [name]: updatedValue
        });
    };

    const [selectedSubCategory, setSelectedSubCategory] = useState('');

    const handleSubCategoryChange = (e) => {
        setSelectedSubCategory(e.target.value);
    };

    useEffect(() => {
        axios.get(`/api/admin/product/productModify?id=${params.id}`).then(response => {
                //setResArr(response.data);
                setInputValue(response.data);
            }
        )
            .catch(error => console.log(error))
    }, []);

    /* 이미지 로드 오류 발생 시 기본 이미지로 교체 */
    const defaultImg = `${process.env.PUBLIC_URL}/404.jpg`;
    const handleImgError = (e) => {
        e.target.src = defaultImg;
    };

    const [productKind, setProductKind] = useState(inputValue.productKind);
    const options = [
        {value: 'clothing', label: '의류'},
        {value: 'electronics', label: '전자제품'},
        {value: 'books', label: '책'},
        {value: 'food', label: '식품'},
        {value: 'toys', label: '장난감'}
    ];

    const initialImage = `${inputValue.filePath}`;
    const navigate = useNavigate();

    /* 이미지 교체 핸들러 */
    const [image, setImage] = useState(initialImage);
    const [newImage, setNewImage] = useState(null);

    useEffect(() => {
        /* 초기 이미지가 변경될 때마다 상태 업데이트 */
        setImage(initialImage);
    }, [initialImage]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    //수정
    const handleSubmit = (e) => {

        e.preventDefault();

        const msg = window.confirm("정말 수정하시겠습니까?");
        const formData = new FormData(e.target);
        const price = formData.get("price").replace(/,/g, ""); /* g 플래그를 사용하여 모든 쉼표를 제거 */
        const shipping = formData.get("shipping").replace(/,/g, ""); /* g 플래그를 사용하여 모든 쉼표를 제거 */
        formData.set("price", price); /* price를 수정된 값으로 설정 */
        formData.set("shipping", shipping); /* shipping 수정된 값으로 설정 */

        if(!formData.get("productNm")){
            alert("제품명을 입력하세요.");
        }else if(!formData.get("price")){
            alert("가격을 입력하세요.");
        }else if(!formData.get("shipping")){
            alert("배송비를 입력하세요.");
        }else if(!formData.get("content")){
            alert("상품설명을 입력하세요.");
        }else{
            if(msg){
                axios.post('/api/admin/product/updateProduct', formData)
                    .then(response => {
                        alert("상품이 수정되었습니다.");
                        /* useHistory import 안되면 아래 코드로 수정해서 반영 */
                        /* 응답을 받고 제품 등록화면으로 돌아감 */
                        navigate(`/productDetail/${params.id}`);
                    })
                    .catch(error => {
                        console.error('Error submitting post: ', error);
                    });
            }
        }
    };

    //삭제
    const handleDelete = () => {
        const msg = window.confirm("정말 삭제하시겠습니까?");
        if (msg){
            axios.post('/api/admin/product/deleteProduct',
                {
                    params: {id: params.id}
                })
                .then(response => {
                    alert("상품이 삭제되었습니다.");
                    /* useHistory import 안되면 아래 코드로 수정해서 반영 */
                    /* 응답을 받고 제품 등록화면으로 돌아감 */
                    navigate(`/productList`);
                })
                .catch(error => {
                    console.error('Error submitting post: ', error);
                });
        }
    };


    return (
        <div className="divTable">
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Table striped bordered hover>
                        <tbody>
                        <tr>
                            <td><Form.Label>상품명</Form.Label></td>
                            <td>
                                <Form.Control
                                    name="productNm"
                                    type="text"
                                    placeholder="제품명을 입력하세요."
                                    value={inputValue.productNm || ''}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><Form.Label>가격</Form.Label></td>
                            <td>
                                <Form.Control
                                    name="price"
                                    className="price"
                                    type="text"
                                    placeholder="가격을 입력하세요."
                                    value={addCommasToPrice(inputValue.price) || ''}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><Form.Label>배송비</Form.Label></td>
                            <td>
                                <Form.Control
                                    name="shipping"
                                    className="shipping"
                                    type="text"
                                    placeholder="가격을 입력하세요."
                                    value={addCommasToPrice(inputValue.shipping) || ''}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><Form.Label>상품설명</Form.Label></td>
                            <td>
                                <Form.Control
                                    name="content"
                                    className="content"
                                    as="textarea"
                                    rows={5}
                                    placeholder="상품설명을 입력하세요."
                                    value={inputValue.content || ''}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><Form.Label>상품종류</Form.Label></td>
                            <td>
                                <Form.Control
                                    name="productKind"
                                    className="productKind"
                                    as="select"
                                    style={{width: '100px', height: '35px'}}
                                    value={productKind || ''} // 선택된 값을 상태로 설정
                                    onChange={(e) => setProductKind(e.target.value)} // 선택된 값 업데이트
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
                        {productKind === '의류' && (
                            <tr>
                                <td>
                                    {/* "의류"가 선택되었을 때만 하위 카테고리 드롭다운을 표시 */}
                                        <Form.Group controlId="formSubCategory" style={{ marginTop: '10px' }}>
                                            <Form.Label>세부 카테고리</Form.Label>
                                            <Form.Control
                                                name="subCategory"
                                                className="subCategory"
                                                as="select"
                                                style={{ width: '100px', height: '35px' }}
                                                value={selectedSubCategory}
                                                onChange={handleSubCategoryChange}
                                            >
                                                <option value="">선택</option>
                                                <option value="top">Top</option>
                                                <option value="bottom">Bottom</option>
                                                <option value="acc">Acc</option>
                                            </Form.Control>
                                        </Form.Group>
                                </td>
                            </tr> )}
                        <tr>
                            <td><Form.Label>작성자</Form.Label></td>
                            <td>
                                <Form.Control
                                    name="author"
                                    className="author"
                                    type="text"
                                    placeholder="관리자"
                                    defaultValue="관리자"
                                    readOnly={true}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><Form.Label>이미지 첨부</Form.Label></td>
                            <td>
                                <div>
                                    {newImage ? (
                                        <div>
                                            <h3>미리보기 새 이미지:</h3>
                                            <img
                                                src={newImage}
                                                alt="미리보기 새 이미지"
                                                style={{maxWidth: '500px', maxHeight: '500px'}}
                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            <h3>현재 이미지:</h3>
                                            <img
                                                src={image}
                                                alt="현재 이미지"
                                                style={{maxWidth: '500px', maxHeight: '500px'}}
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <h3>새 이미지 업로드:</h3>
                                        <input
                                            name="file"
                                            className="file"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                        <input type="hidden" value={inputValue.filePath || ''} name="originFilePath"/>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" className="text-center">
                                <input type="hidden" name="id" className="id" value={params.id || ''} readOnly/>
                                <Button variant="primary" type="submit" className="updateBtn">
                                    저장
                                </Button>
                                &nbsp;&nbsp;
                                <Button variant="primary" type="button" className="deleteBtn" onClick={handleDelete}>
                                    삭제
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

export default ProductModify;