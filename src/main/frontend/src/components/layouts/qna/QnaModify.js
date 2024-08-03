import React, {useEffect, useRef, useState} from 'react';
import {Button, Container, Form, Table} from 'react-bootstrap';
import {useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import ImageEditor from '../../../js/utils/ImageEditor';

function QnaModify() {

    //const [resArr, setResArr] = useState([]);
    const params = useParams();

    // 입력 필드 값을 상태로 관리
    const [inputValue, setInputValue] = useState({
        titlte: '',
        content: '',
        author: '',
        file: '',
    });
    const { titlte, content, author,file } = inputValue;
    // onChange 이벤트 핸들러
    const handleChange = (e) => {

        // input 요소의 name 속성과 value를 가져옵니다
        const { name, value } = e.target;

        // price 필드인 경우 formatPrice 함수를 적용하여 값 변환
        const updatedValue = value;

        // 상태를 업데이트합니다
        setInputValue({
            ...inputValue,
            [name]: updatedValue
        });
    };

    useEffect(() => {
        axios.get('/user/qna/qnaModify',
            {
                params: {id: params.id}
            }).then(response => {
                //setResArr(response.data);
                setInputValue(response.data);
            }
        )
            .catch(error => console.log(error))
    }, []);

    const defaultImg = `${process.env.PUBLIC_URL}/404.jpg`;
    const handleImgError = (e) => {
        e.target.src = defaultImg; // 이미지 로드 오류 발생 시 기본 이미지로 교체
    };

    const initialImage = `/upload/img/${inputValue.fileNm}`;

    const navigate = useNavigate();

    //수정
    const handleSubmit = (e) => {

        e.preventDefault();

        const msg = window.confirm("정말 수정하시겠습니까?");
        const formData = new FormData(e.target);

        const data = Object.fromEntries(formData.entries());

        if(!formData.get("title")){
            alert("제목을 입력하세요.");
        }else if(!formData.get("content")){
            alert("내용을 입력하세요.");
        }else{
            if(msg){
                axios.post('/user/qna/updateQna', formData)
                    .then(response => {
                        //console.log('Post submitted successfully');
                        alert("수정되었습니다.");
                        // useHistory import 안되면 아래 코드로 수정해서 반영
                        // 응답을 받고 상세화면으로 돌아감
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
            axios.get('/user/qna/deleteQna',
                {
                    params: {id: params.id}
                })
                .then(response => {
                    //console.log('Post submitted successfully');
                    alert("삭제되었습니다.");
                    // useHistory import 안되면 아래 코드로 수정해서 반영
                    // 응답을 받고 리스트 화면으로 돌아감
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
                                <ImageEditor initialImage={initialImage}/>
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