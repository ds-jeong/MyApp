import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {Button, Table} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactPaginate from 'react-paginate';


function QnaList() {
    const navigate = useNavigate();
    const [resArr, setResArr] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10;

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const fetchData = async (page) => {
        try {
            //데이터 호출
            const response = await axios.get(`/admin/qna/qnaList?page=${page}&size=${pageSize}`);
            setResArr(response.data.content);
            setPageCount(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching fetchData", error.response ? error.response.data : error);
        }
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const handleTitleClick = async (id) => {
        try {
            // 조회수 증가 요청
            await axios.get(`/admin/qna/addQnaViews?id=${id}`);

            // 페이지 이동
            navigate(`/qnaDetail/${id}`);

        } catch (error) {
            console.error('Error updating view count:', error);
        }
    };

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
                            <th>글번호</th>
                            <th>제목</th>
                            <th>글쓴이</th>
                            <th>조회수</th>
                        </tr>
                        </thead>
                        <tbody>
                        {resArr && resArr.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <button
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: 'black',
                                            textDecoration: 'underline',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => handleTitleClick(item.id)}>
                                        {item.title}
                                    </button>
                                </td>
                                <td>{item.author}</td>
                                <td>{item.views}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
                {/* pagination */}
                <div>
                    <ReactPaginate
                        pageCount={pageCount}
                        pageRangeDisplayed={5}
                        marginPagesDisplayed={2}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        previousClassName={'page-item'}
                        previousLinkClassName={'page-link'}
                        nextClassName={'page-item'}
                        nextLinkClassName={'page-link'}
                        breakClassName={'page-item'}
                        breakLinkClassName={'page-link'}
                        activeClassName={'active'}
                    />
                </div>
                {/* //pagination// */}
            </div>
        </div>
    )
        ;
}

export default QnaList;