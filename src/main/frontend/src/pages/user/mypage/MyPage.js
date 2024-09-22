import React from 'react';
import {Button, Container, Form} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function MyPage() {
    return (
        <div>
            <div>
                <Container>
                    <Form className="custom-form">
                        <Form.Group className="mb-3">
                            <Form.Label>아이디</Form.Label>
                            <Form.Control
                                type="text"
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control
                                type="password"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            로그인
                        </Button>
                    </Form>
                </Container>
            </div>
        </div>
    )
        ;
}

export default MyPage;