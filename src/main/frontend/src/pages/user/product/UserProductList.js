import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {Button, Card, CardBody, CardFooter, CardImg, Container, Dropdown } from "react-bootstrap";
import { FaHeart } from "react-icons/fa"; // 하트 아이콘 추가
import {formatPrice} from '../../../utils/formatUtils';
import ReactPaginate from "react-paginate";

function UserProductList() {
    const { category } = useParams();
    const token = window.localStorage.getItem('token');
    const navigate = useNavigate();
    const [resArr, setResArr] = useState(['']);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10;
    const [sortOption, setSortOption] = useState("default");
    const [selectedSort, setSelectedSort] = useState("정렬 기준"); // 초기값 설정
    const [userId, setUserId] = useState();
    const [productId, setProductId] = useState();
    const [likes, setLikes] = useState({}); // 각 제품의 좋아요 상태를 저장할 객체

    //product Rendering
    useEffect(() => {
        const fetchData = async (currentPage) => {
            try {
                const url = category
                    ? `/user/product/userProductList?page=${currentPage}&size=${pageSize}&category=${category}` //top/bottom/acc 일 경우
                    : `/user/product/userProductList?page=${currentPage}&size=${pageSize}`;
                console.log("currentPage:", currentPage, "pageSize:", pageSize, "category:", category);

                const response = await axios.get(url);
                setResArr(response.data.content);
                setPageCount(response.data.totalPages);
            } catch (error) {
                console.error("Error fetching fetchData", error);
            }
        };

        fetchData(currentPage);
    }, [currentPage]); //페이지 변경 시 마다 실행

    //userId setting
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const userInfo = userData?.userInfo;
        setUserId(userInfo?.id); // userId를 설정
        console.log(userId); // 업데이트된 userId 로그
    }, []); // 컴포넌트가 처음 렌더링될 때만 실행


    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    // Default image path if the primary image fails
    const defaultImg = `${process.env.PUBLIC_URL}/404.jpg`;

    // Handle image error
    const handleImgError = (e) => {
        e.target.src = defaultImg; // 이미지 로드 오류 발생 시 기본 이미지로 교체
    };

    // 좋아요 여부를 백엔드에서 불러오기 (로그인한 사용자에 따라 한 번만 적용)
    useEffect(() => {
        console.log(likes);
        const fetchLikes = async () => {
            try {
                const response = await axios.get('/user/like/likedProducts', {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        userId: userId,
                    }
                });

                const fetchedLikesArray = response.data; // 예: [5, 1]
                const fetchedLikes = {};
                // 배열을 객체로 변환(likes 여부에 따라 하트 비우거나 채움)
                fetchedLikesArray.forEach(productId => {
                    fetchedLikes[productId] = true; // 해당 ID에 대해 좋아요가 true로 설정
                });

                setLikes(fetchedLikes);
                console.log(fetchedLikes);
                localStorage.setItem('likes', JSON.stringify(fetchedLikes));
            } catch (error) {
                console.error("Error fetching likes data", error);
            }
        }

        if (userId) { // userId가 존재할 때만 fetchLikes 호출
            fetchLikes();
        }
    }, [userId]);

    // 페이지 새로고침 시 localStorage에서 좋아요 상태 불러오기
    useEffect(() => {
        const storedLikes = localStorage.getItem('likes');
        if (storedLikes) {
            setLikes(JSON.parse(storedLikes));
        }
    }, []);

    // 좋아요 토글 핸들러
    const handleToggleLike = async (productId) => {
        if (!token) {
            alert("로그인이 필요합니다.");
            navigate("/login"); // 로그인 페이지로 리디렉션
            return;
        }

        try {
            const response = await axios.post(
                `/user/like/toggleLike`,
                {
                    userId: userId,
                    productId: productId
                }, // POST 요청 본문은 비워둠
                { headers: { Authorization: `Bearer ${token}` } }
            );


            setLikes((prevLikes) => {
                const updatedLikes = {
                    ...prevLikes,
                    [productId]: !prevLikes[productId], // 기존의 상태를 바탕으로 업데이트
                };
                // localStorage에 좋아요 상태 저장
                localStorage.setItem('likes', JSON.stringify(updatedLikes));
                return updatedLikes; // 새로운 상태 반환
            });
        } catch (error) {
            console.error("Error toggling favorite", error);
        }
    };


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

    // 정렬 함수
    const handleSort = (option, label) => {
        setSortOption(option);
        setSelectedSort(label); // 선택한 정렬 기준으로 버튼 텍스트 설정

        let sortedArray = [...resArr];

        if (option === "sales") {
            sortedArray.sort((a, b) => b.salesCount - a.salesCount); // 조회수 내림차순 정렬
        } else if (option === "priceLow") {
            sortedArray.sort((a, b) => a.price - b.price); // 가격 낮은 순 정렬
        } else if (option === "discount") {
            sortedArray.sort((a, b) => b.discount - a.discount); // 할인율 내림차순 정렬
        } else if (option === "reviews") {
            sortedArray.sort((a,b) => b.reviewCount - a.reviewCount); // 리뷰수 내림차순 정렬
        }
        setResArr(sortedArray);
    };

    return (
        <div className="divTable">
            <section className="py-5">
                <Container>
                    <div className="d-flex justify-content-between mb-3">
                        <Button variant="outline-dark" href="/productRegist">글쓰기</Button>
                        <Dropdown align="end">
                            <Dropdown.Toggle variant="outline-secondary">
                                {selectedSort}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleSort("sales", "판매 순")}>판매 순</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleSort("priceLow", "가격 낮은 순")}>가격 낮은 순</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleSort("discount", "할인율 순")}>할인율 순</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleSort("reviews", "리뷰 순")}>리뷰 많은 순</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
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
                                                <Link to={`/userProductDetail/${item.id}`}>
                                                    View options1
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="link"
                                                className="favorite-button"
                                                onClick={() => handleToggleLike(item.id)}
                                            >
                                                <FaHeart color={likes[item.id] ? "red" : "grey"} />
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