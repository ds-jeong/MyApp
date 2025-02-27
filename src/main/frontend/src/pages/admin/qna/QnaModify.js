import React, {useEffect, useRef, useState} from 'react';
import {Button, Container, Form, Table} from 'react-bootstrap';
import {useNavigate, useParams} from "react-router-dom";
import axios from 'axios';

function QnaModify() {

    const params = useParams();

    /* 입력 필드 값을 상태로 관리 */
    const [inputValue, setInputValue] = useState({
        titlte: '',
        content: '',
        author: '',
        file: '',
        filePath: '',
    });

    const { titlte, content, author,file } = inputValue;
    const handleChange = (e) => {

        /* input 요소의 name 속성과 value를 가져옴 */
        const { name, value } = e.target;

        /* value 업데이트 */
        const updatedValue = value;

        /* 상태를 업데이트 */
        setInputValue({
            ...inputValue,
            [name]: updatedValue
        });
    };

    useEffect(() => {
        axios.get('/api/admin/qna/qnaModify',
            {
                params: {id: params.id}
            }).then(response => {
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

    const initialImage = `${inputValue.filePath}`
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

        if(!formData.get("title")){
            alert("제목을 입력하세요.");
        }else if(!formData.get("content")){
            alert("내용을 입력하세요.");
        }else{
            if(msg){
                axios.post('/api/admin/qna/updateQna', formData)
                    .then(response => {
                        alert("수정되었습니다.");
                        /* useHistory import 안되면 아래 코드로 수정해서 반영 */
                        /* 응답을 받고 제품 등록화면으로 돌아감 */
                        navigate(`/qnaDetail/${params.id}`);
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
            axios.get('/api/admin/qna/deleteQna',
                {
                    params: {id: params.id}
                })
                .then(response => {
                    alert("삭제되었습니다.");
                    /* useHistory import 안되면 아래 코드로 수정해서 반영 */
                    /* 응답을 받고 제품 등록화면으로 돌아감 */
                    navigate(`/qnaList`);
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
                            <td><Form.Label>제목</Form.Label></td>
                            <td>
                                <Form.Control
                                    name="title"
                                    type="text"
                                    placeholder="제목을 입력하세요."
                                    value={inputValue.title || ''}
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
                                    placeholder="내용을 입력하세요."
                                    value={inputValue.content || ''}
                                    onChange={handleChange}
                                />
                            </td>
                        </tr>
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

export default QnaModify;