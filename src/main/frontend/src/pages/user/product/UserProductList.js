import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {Button, Card, CardBody, CardFooter, CardImg, Container} from "react-bootstrap";
import {formatPrice} from '../../../utils/formatUtils';
import ReactPaginate from "react-paginate";

function UserProductList() {
    const token = window.localStorage.getItem('token');
    const navigate = useNavigate();
    const [resArr, setResArr] = useState(['']);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10;

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const fetchData = async (currentPage) => {
        try {
            const response = await axios.get(`/user/product/userProductList?page=${currentPage}&size=${pageSize}`);
            setResArr(response.data.content);
            setPageCount(response.data.totalPages);
            // const response = await axios.post(`/user/product/userProductList`);
            // setResArr(response.data);
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

    // useEffect(async () => {
    //     const fetchData = async () => {
    //         const res = await axios.get(...)
    //         if (res.data.type === 'liked') setLike(true)
    //     }
    //     fetchData()
    // }, []);

    // const toggleLike = async (e) => {
    //     const res = await axios.post(...) // [POST] 사용자가 좋아요를 누름 -> DB 갱신
    //     setLike(!like)
    // }
    const [like, setLike] = useState(false);
    // const [userId, setUserId] = useState('');
    // const [productId, setProductId] = useState('');
    const handleToggleLike = (e) => {
        try {
            // 서버에 로그아웃 요청 보내기
            if (token) {
                // const productId = e.target.getAttribute('data-custom');
                //
                // axios.post('/user/cart/addItemToCart', formData)
                //     .then(response => {
                //         alert("장바구니에 추가되었습니다");
                //         /* useHistory import 안되면 아래 코드로 수정해서 반영 */
                //         /* 응답을 받고 제품 등록화면으로 돌아감 */
                //         navigate(`/productDetail/${params.id}`);
                //     })
                //     .catch(error => {
                //         console.error('Error submitting post: ', error);
                //     });
                // await axios.post('/user/cart/cartItemList', null, {
                //     params: {token}
                // });
            }

            // 로그아웃 후 로그인 페이지로 리디렉션
            //window.location.replace('/login');

        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    const handleToggleCart = (e) => {
        try {
            // 서버에 로그아웃 요청 보내기
            if (token) {
                const productId = e.target.getAttribute('data-custom');

                // await axios.post('/user/like/toggleLike', null, {
                //     params: {token}
                // });
            }

            // 로그아웃 후 로그인 페이지로 리디렉션
            //window.location.replace('/login');

        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    return (
        <div className="divTable">
            <section className="py-5">
                <Container>
                    <Button variant="outline-dark" href="/productRegist">글쓰기</Button>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4">
                        {resArr && resArr.map((item, index) => (
                            <div className="col mb-5" key={index}>
                                <Card className="h-100">
                                    <CardImg className="cardImg" top="true"
                                             src={`${item.filePath}`}
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
                                                <Link to={`/userProductDetail/${item.productId}`}>
                                                    View options1
                                                </Link>
                                            </Button>
                                        </div>
                                        {/*<div className="text-center">*/}
                                        {/*    <CartButton like={like} productId={item.id} onClick={handleToggleCart}/>*/}
                                        {/*    <LikeButton like={like} productId={item.id} onClick={handleToggleLike}/>*/}
                                        {/*</div>*/}
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
                {pageCount > 0 && (
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
                )}
            </div>
            {/* //pagination// */}
        </div>
    );
}

export default UserProductList;