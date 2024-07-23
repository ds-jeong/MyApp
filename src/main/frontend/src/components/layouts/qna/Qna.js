import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Button, Table} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Qna() {
    //const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');

    // useEffect(() => {
    //     fetchPosts();
    // }, []);

    // const fetchPosts = () => {
    //     axios.get('http://localhost:8080/api/posts') // 이 부분은 실제 백엔드 API 엔드포인트로 변경해야 합니다.
    //         .then(response => {
    //             setPosts(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching posts: ', error);
    //         });
    // };

    // const handlePostSubmit = () => {
    //     const data = {
    //         content: newPostContent
    //     };
    //
    //     axios.post('http://localhost:8080/api/posts', data) // 이 부분은 실제 백엔드 API 엔드포인트로 변경해야 합니다.
    //         .then(response => {
    //             console.log('Post submitted successfully');
    //             fetchPosts(); // 새로운 글 추가 후 목록 다시 불러오기
    //             setNewPostContent('');
    //         })
    //         .catch(error => {
    //             console.error('Error submitting post: ', error);
    //         });
    // };

    const handleInputChange = event => {
        setNewPostContent(event.target.value);
    };

    const posts = [
        { title: '첫 번째 글', author: '작성자1', views: 10 },
        { title: '두 번째 글', author: '작성자2', views: 20 },
        { title: '세 번째 글', author: '작성자3', views: 30 },
    ];

    return (
        <div className="divTable">
            <div className="header">
                <Button className="write-btn" href="/qnaRegist">글쓰기</Button>
            </div>
            <div className="post-list">
                    <div>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>제목</th>
                                <th>글쓴이</th>
                                <th>조회수</th>
                            </tr>
                            </thead>
                            <tbody>
                            {posts.map((post, index) => (
                                <tr key={index}>
                                    <td>{post.title}</td>
                                    <td>{post.author}</td>
                                    <td>{post.views}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                    <div className="post">
                        <div className="post-content"></div>
                        <div className="post-number">글 번호: </div>
                    </div>
            </div>
        </div>

    // <div className="Qna">
    //     <div className="header">
    //         <button className="write-btn">글쓰기</button>
    //     </div>
    //     <div className="post-list">
    //         {posts.map((post, index) => (
    //             <div key={post.id} className="post">
    //                 <div className="post-content">{post.content}</div>
    //                 <div className="post-number">글 번호: {index + 1}</div>
    //             </div>
    //         ))}
    //     </div>
    // </div>
)
    ;
}

export default Qna;