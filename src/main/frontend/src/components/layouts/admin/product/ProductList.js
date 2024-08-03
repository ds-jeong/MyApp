import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Button, Card, CardBody, CardFooter, CardImg, Container} from "react-bootstrap";
import {formatPrice} from '../../../../js/utils/formatUtils';
import {Link} from "react-router-dom";

function ProductList() {

    const [resArr, setResArr] = useState([])

    useEffect(() => {
        axios.get('/admin/product/productList')
            .then(response => {
                    setResArr(response.data);
                }
            )
            .catch(error => console.log(error))
    }, []);

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
        </div>

        // <div className="QnaList">
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

export default ProductList;