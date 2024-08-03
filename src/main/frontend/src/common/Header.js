import React from 'react';
import { useLocation } from 'react-router-dom';
import {Container, Navbar, Nav, NavItem, NavLink, Button, NavbarBrand, NavDropdown, Form} from 'react-bootstrap';
import Slider from './slick/Slider';


const Header = () => {

    const location = useLocation();
    // 현재 URL을 가져옵니다
    const currentPath = location.pathname;

    let title, subtitle;

    const accessToken = window.localStorage.getItem('accessToken');
    const userId = window.localStorage.getItem('userId');
    const role = window.localStorage.getItem('role');

    console.log('userId : ' + userId + 'role : ' + role );

    // URL에 따라 다른 문구 설정
    if (location.pathname === '/allProduct') {
        title = 'All Products';
    } else if (location.pathname === '/top') {
        title = 'Top';
        // subtitle = 'Learn more about our shop';
    } else if (location.pathname === '/bottom') {
        title = 'Botoom';
    } else if (location.pathname === '/acc') {
        title = 'Acc';
    } else if (location.pathname === '/qna') {
        title = 'Q&A';
    }

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
                                <NavDropdown.Item href="/allProduct">All Products</NavDropdown.Item>
                                <NavDropdown.Item href="/top">Top</NavDropdown.Item>
                                <NavDropdown.Item href="/bottom">Bottom</NavDropdown.Item>
                                <NavDropdown.Item href="/acc">Acc</NavDropdown.Item>
                                {/*<NavDropdown.Divider/>*/}
                            </NavDropdown>
                            <NavItem>
                                <NavLink href="/qnaList">Q&A</NavLink>
                            </NavItem>
                            <NavDropdown title="Admin" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/productList">All Products</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form className="d-flex">
                            <Button variant="outline-dark">
                                <i className="bi-cart-fill me-1"></i>
                                <span className="badge bg-dark text-white ms-1 rounded-pill">0</span>
                            </Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Slider/>
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