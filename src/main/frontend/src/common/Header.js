import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {Container, Navbar, Nav, NavItem, NavLink, Button, NavbarBrand, NavDropdown, Form} from 'react-bootstrap';
import Slider from './slick/Slider';
const CLIENT_ID = process.env.REACT_APP_REST_API_KEY;
const REDIRECT_URI  = process.env.REACT_APP_LOGOUT_REDIRECT_URL;
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const token = window.localStorage.getItem('token');
    const type = window.localStorage.getItem('type');
    const state = window.localStorage.getItem('state');

    useEffect(() => {
        /* token 값의 유무로 권한주입 */
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
        const userData = JSON.parse(localStorage.getItem('userData'));

        // console.log로 출력
        console.log('Token:', token);
        console.log('Type:', type);
        console.log('State:', state);
        console.log('User Data:', userData);

        const userInfo = userData?.userInfo;

        /* 변수에 맞게 값 할당 */
        const id = userInfo?.id;
        const userId = userInfo?.userId;
        const userNm = userInfo?.userNm;
        const phone = userInfo?.phone;
        const address = userInfo?.address;
        const role = userInfo?.role;
        const email = userInfo?.email;
        console.log('id : ' + id);
        console.log('아이디 : ' + userId);
        console.log('사용자명 : ' + userNm);
        console.log('연락처 : ' + phone);
        console.log('주소 : ' + address);
        console.log('role: ' + role);
        console.log('이메일 : ' + email);
    }, []); /* 빈 배열로 설정하여 컴포넌트가 처음 마운트될 때만 실행 */


    /* localStorage에 저장된 사용자의 정보 */
    const userDataStr = window.localStorage.getItem('userData');
    /* Json으로 파싱 */
    const userData = JSON.parse(userDataStr);
    /* 파싱한 데이터를 변수에 저장 */
    const userInfo = userData?.userInfo;

    /* 변수에 맞게 값 할당 */
    const id = userInfo?.id;
    const userId = userInfo?.userId;
    const userNm = userInfo?.userNm;
    const phone = userInfo?.phone;
    const address = userInfo?.address;
    const role = userInfo?.role;
    const email = userInfo?.email;

    // console.log('id : ' + id);
    // console.log('아이디 : ' + userId);
    // console.log('사용자명 : ' + userNm);
    // console.log('연락처 : ' + phone);
    // console.log('주소 : ' + address);
    // console.log('role: ' + role);
    // console.log('이메일 : ' + email);

    /* 현재 URL */
    const location = useLocation();
    const currentPath = location.pathname;

    let title, subtitle;

    /* URL에 따라 다른 문구 설정 */
    if (location.pathname === '/allProduct') {
        title = 'All Products';
    } else if (location.pathname === '/top') {
        title = 'Top';
        // subtitle = 'Learn more about our shop';
    } else if (location.pathname === '/bottom') {
        title = 'Bottom';
    } else if (location.pathname === '/acc') {
        title = 'Acc';
    } else if (location.pathname === '/qna') {
        title = 'Q&A';
    }

    const handleLogout = async () => {
        try {
            // 카카오 로그아웃
            if(type === 'kakao') {
                const response = await axios.get(`${BACKEND_URL}/logout/kakao`);
                console.log('Logout successful:', response.data);

                if(response.data !== 302) {
                    alert('로그아웃에 실패했습니다.')
                }
                else {
                    alert('로그아웃 되었습니다.')
                    window.localStorage.removeItem('token');
                    window.localStorage.removeItem('userData');
                    window.localStorage.removeItem('type');
                    window.localStorage.removeItem('state');
                    setIsAuthenticated(false);  // 상태 업데이트
                }
                window.location.replace('/');
            }
            /* 서버에 로그아웃 요청 보내기 */
            if (token) {
                await axios.post('/api/logout', null, {
                    params: {token}
                });
            }

            /* localStorage에서 JWT 토큰 삭제 */
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('userData');

            /* 로그아웃 후 로그인 페이지로 리디렉션 */
            window.location.replace('/login');

        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    const navigate = useNavigate();
    const handleCart = () => {
        navigate('/cart');
    };
    const handleMyPage = () => {
        navigate('/myPage');
    };

    return (
        <div className="header">
            <Navbar bg="light" expand="lg">
                <Container>
                    <NavbarBrand href="#!">
                        <img
                            src={process.env.PUBLIC_URL + '/assets/images/photo-1441984904996-e0b6ba687e04.jpeg'}
                            alt="Mobirise Website Builder"
                            style={{height: "4.3rem"}}
                        />
                    </NavbarBrand>
                    <NavbarBrand href="#!" className="navbar-caption text-black display-4">
                        FunkyThreads
                    </NavbarBrand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavItem>
                                <NavLink href="/">Home</NavLink>
                            </NavItem>
                            <NavDropdown title="Shop" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/userProductList">All Products</NavDropdown.Item>
                                <NavDropdown.Item href="/top">Top</NavDropdown.Item>
                                <NavDropdown.Item href="/bottom">Bottom</NavDropdown.Item>
                                <NavDropdown.Item href="/acc">Acc</NavDropdown.Item>
                            </NavDropdown>
                            <NavItem>
                                <NavLink href="/qnaList">Q&A</NavLink>
                            </NavItem>
                            <NavDropdown title="Admin" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/productList">All Products</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form className="d-flex">
                            {!isAuthenticated ? (
                                <>
                                    <Button variant="outline-primary">
                                        <Link to={`/login`}>
                                            로그인
                                        </Link>
                                    </Button>
                                    <Button variant="outline-primary">
                                        <Link to={`/join`}>
                                            회원가입
                                        </Link>
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="outline-primary" onClick={handleCart}>
                                        장바구니
                                        {/*<span className="badge bg-dark text-white ms-1 rounded-pill">0</span>*/}
                                    </Button>
                                    &nbsp;&nbsp;
                                    <Button variant="outline-primary" onClick={handleMyPage}>
                                        마이페이지
                                    </Button>
                                    &nbsp;&nbsp;
                                    <Button variant="outline-primary" onClick={handleLogout}>
                                        로그아웃
                                    </Button>
                                </>
                            )}
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {currentPath !== '/login' && currentPath !== '/join' &&
                <Slider/>
            }
            {currentPath !== '/' &&
                <header className="bg-custom py-5">
                    <Container>
                        <div className="text-center text-white">
                            <h1 className="display-4 fw-bolder">{title}</h1>
                            {/*<p className="lead fw-normal text-white-50 mb-0">With this shop homepage template</p>*/}
                        </div>
                    </Container>
                </header>
            }
        </div>
    )
}

export default Header;