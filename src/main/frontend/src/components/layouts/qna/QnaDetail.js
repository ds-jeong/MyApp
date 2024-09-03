import React, {useEffect, useState} from 'react';
import {Button, Container, Form, Table} from 'react-bootstrap';
import {useParams} from "react-router-dom";
import axios from 'axios';

function QnaDetail() {

    const [resArr, setResArr] = useState([]);
    const params = useParams();

    useEffect(() => {
        axios.get('/user/qna/qnaDetail',
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

    return (
        <div className="divTable">
            <Container>
                <Form>
                    <Table striped bordered hover>
                        <tbody>
                        <tr>
                            <td><Form.Label>제목</Form.Label></td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="제목 입력"
                                    value={resArr.title || ''}
                                    readOnly
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><Form.Label>내용</Form.Label></td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="내용 입력"
                                    value={resArr.content || ''}
                                    readOnly
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><Form.Label>작성자</Form.Label></td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="관리자"
                                    value={resArr.author || ''}
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
                                <Button variant="primary" type="button" href={'/qnaList'}>
                                    목록
                                </Button>
                                &nbsp;&nbsp;
                                <Button variant="primary" type="button" href={`/qnaModify/${resArr.id}`}>
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

export default QnaDetail;