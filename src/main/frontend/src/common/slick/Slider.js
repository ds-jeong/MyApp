import React, {Component} from 'react';

import Slider from 'react-slick';
import axios from 'axios';

export default class SimpleSlider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            resArr: []  // 백엔드에서 받아올 데이터를 저장할 상태
        };
    }

    componentDidMount() {
        axios.get('/user/product/favoriteProductList')
            .then(response => {
                this.setState({
                    resArr: response.data}
                );  // 데이터를 상태에 저장
            })
            .catch(error => {
                console.error('Error fetching slider data:', error);
            });
    }


    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 400,
            slidesToShow: 3,
            slidesToScroll: 3,
            autoplay: true,
        };

        // Default image path if the primary image fails
        const defaultImg = `${process.env.PUBLIC_URL}/404.jpg`;

        // Handle image error
        const handleImgError = (e) => {
            e.target.src = defaultImg; // 이미지 로드 오류 발생 시 기본 이미지로 교체
        };

        return (
            <div>
                {/*<h2> Single Item</h2>*/}
                <Slider {...settings}>
                    {this.state.resArr.map((item, index) => (
                    <div key="index">
                        <img
                            className="resizeImg"
                            src={`${process.env.PUBLIC_URL}/upload/img/${item.fileNm}`}
                            onError={handleImgError}
                        />
                    </div>
                    ))}
                </Slider>
            </div>
        );
    }
}