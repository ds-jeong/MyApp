import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {Button, Card, CardBody, CardFooter, CardImg, Container} from "react-bootstrap";
import {formatPrice} from '../../../../js/utils/formatUtils';
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate";

function ProductList() {
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
            const response = await axios.get(`/admin/product/productList?page=${page}&size=${pageSize}`);
            setResArr(response.data.content);
            setPageCount(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching fetchData", error);
        }
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    // Default image path if the primary image fails
    const defaultImg = `${process.env.PUBLIC_URL}/404.jpg`;

    // Handle image error
    const handleImgError = (e) => {
        e.target.src = defaultImg; // 이미지 로드 오류 발생 시 기본 이미지로 교체
    };

    return (
        <div className="divTable">
            <section className="py-5">
                <Container>
                    <Button variant="outline-dark" href="/productRegist">글쓰기</Button>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4">
                        {resArr.map((item, index) => (
                            <div className="col mb-5" key={index}>
                                <Card className="h-100">
                                    <CardImg className="cardImg" top="true" src={`${process.env.PUBLIC_URL}/upload/img/${item.fileNm}`}
                                             alt="Card image cap"
                                             onError={handleImgError}/>
                                    <CardBody>
                                        <div className="text-center">
                                            <h5 className="fw-bolder">{item.productNm}</h5>
                                            {formatPrice(item.price)} {/* 공통 함수로 가격 포맷 */}
                                        </div>
                                    </CardBody>
                                    <CardFooter className="p-4 pt-0 border-top-0 bg-transparent">
                                        <div className="text-center">
                                            <Button variant="outline-dark">
                                                <Link to={`/productDetail/${item.id}`}>
                                                View options1
                                                </Link>
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </div>
                        ))}
                        {/* Add more cards here */}
                    </div>
                </Container>
            </section>
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
    );
}

export default ProductList;