import React, { useState, useRef } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProductRegist() {
    //폼전송
    const categoryRef = useRef(null);
    const productNmRef = useRef();
    const priceRef = useRef();
    const contentRef = useRef();
    const authorRef = useRef();
    //const productKindRef = useRef();
    const fileRef = useRef();
    const navigate = useNavigate();

    const handleSubmit = event => {

        event.preventDefault();

        const formData = new FormData();
        if (categoryRef.current) {
            formData.append('category', categoryRef.current.value);
        }
        formData.append('productNm', productNmRef.current.value);
        formData.append('price', priceRef.current.value);
        formData.append('content', contentRef.current.value);
        formData.append('author', authorRef.current.value);
        formData.append('file', fileRef.current.files[0]); // 첨부된 이미지 파일 추가

        axios.post('/admin/product/insertProduct', formData)
            .then(response => {
                // console.log('Post submitted successfully');
                alert("상품이 등록되었습니다.");
                // useHistory import 안되면 아래 코드로 수정해서 반영
                // 응답을 받고 제품 등록화면으로 돌아감
                navigate('/productList');
            })
            .catch(error => {
                console.error('Error submitting post: ', error);
            });
    };

    //파일업로드
    const [selectedFile, setSelectedFile] = useState(null);

    const fileSelectedHandler = event => {
        setSelectedFile(event.target.files[0]);
        //console.log(event.target.files[0]);
    };

    const fileUploadHandler = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);

        axios.post('/utill/imgUpload', formData)
            .then(response => {
                //console.log(response.data);
                // Handle success, e.g., show a success message
            })
            .catch(error => {
                console.error('Error uploading file: ', error);
                // Handle error, e.g., show an error message
            });
    };

    return (
        <div>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formTitle">
                        <Form.Label>상품명</Form.Label>
                        <Form.Control type="text" placeholder="상품명 입력" ref={productNmRef} />
                    </Form.Group>

                    <Form.Group controlId="formPrice">
                        <Form.Label>가격</Form.Label>
                        <Form.Control type="number" placeholder="가격 입력"  ref={priceRef} />
                    </Form.Group>

                    <Form.Group controlId="formContent">
                        <Form.Label>상품설명</Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder="상품설명 입력" ref={contentRef} />
                    </Form.Group>

                    <Form.Group controlId="formCategory">
                        <Form.Label>상품종류</Form.Label>
                        <Form.Control as="select" style={{width: '100px', height: '35px'}} ref={categoryRef}>
                            <option value="clothing">의류</option>
                            <option value="electronics">전자제품</option>
                            <option value="books">책</option>
                            <option value="food">식품</option>
                            <option value="toys">장난감</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formAuthor">
                        <Form.Label>작성자</Form.Label>
                        <Form.Control type="text" placeholder="관리자" ref={authorRef} readOnly={true}/>
                    </Form.Group>

                    <Form.Group controlId="formImage">
                    <Form.Label>이미지 첨부</Form.Label>
                        <Form.Control type="file" ref={fileRef} onChange={fileSelectedHandler} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        등록
                    </Button>
                </Form>
            </Container>
            {/*<button onClick={fileUploadHandler}>Upload</button>*/}
        </div>
    );
}

export default ProductRegist;