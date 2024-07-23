import React, {useState} from 'react';
import {
    Container
} from 'react-bootstrap';


const Footer = () => {
    return (
        <div className="footer">
            <footer className="py-5 bg-dark">
                <Container>
                    <p className="m-0 text-center text-white">Copyright &copy; Your Website 2023</p>
                </Container>
            </footer>
        </div>
    )
}

export default Footer;