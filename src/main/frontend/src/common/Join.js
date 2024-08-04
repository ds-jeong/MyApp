import React, {useState} from 'react';
import {Container, Form, Button, Col} from 'react-bootstrap';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Join = () => {
    const [userNm, setUserNm] = useState('');
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState('');
    const [pw, setPw] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('user'); // 기본값: 일반 사용자

    // 유효성 검사 에러 메시지를 관리하는 상태
    const [errors, setErrors] = useState({
        userNm: '',
        email: '',
        userId: '',
        pw: '',
        phone: '',
        address: '',
    });

    const navigate = useNavigate();

    // 폼 제출 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();
        // 폼 유효성 검사
        if (validateForm()) {
            const msg = window.confirm("회원가입하시겠습니까?");
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            axios.post('/api/join', formData)
                .then(response => {
                    //console.log('Post submitted successfully');
                    alert("회원가입이 완료되었습니다.");
                    // useHistory import 안되면 아래 코드로 수정해서 반영
                    // 응답을 받고 제품 등록화면으로 돌아감
                    navigate(`/`);
                })
                .catch(error => {
                    console.error('Error submitting post: ', error);
                });

            console.log('Submitting:', userNm, email, userId, pw, phone, address, role);
        } else {
            console.log('폼 유효성 검사 실패');
        }
    };

    // 폼 유효성 검사 함수
    const validateForm = () => {
        let valid = true;
        const newErrors = {
            userNm: '',
            email: '',
            userId: '',
            pw: '',
            phone: '',
            address: '',
        };

        // 이름 필드 유효성 검사
        if (!userNm.trim()) {
            newErrors.userNm = '이름을 입력하세요.';
            valid = false;
        }

        // 이메일 필드 유효성 검사
        if (!email.trim()) {
            newErrors.email = '이메일을 입력하세요.';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = '유효한 이메일 주소를 입력하세요.';
            valid = false;
        }

        // 아이디 필드 유효성 검사
        if (!userId.trim()) {
            newErrors.userId = '아이디를 입력하세요.';
            valid = false;
        }

        // 비밀번호 필드 유효성 검사
        if (!pw.trim()) {
            newErrors.pw = '비밀번호를 입력하세요.';
            valid = false;
        } else if (pw.length < 6) {
            newErrors.pw = '비밀번호는 최소 6자 이상이어야 합니다.';
            valid = false;
        }

        // 전화번호 필드 유효성 검사
        if (!phone.trim()) {
            newErrors.phone = '전화번호를 입력하세요.';
            valid = false;
        } else if (!/^\d{3}-\d{3,4}-\d{4}$/.test(phone)) {
            newErrors.phone = '유효한 전화번호 형식을 입력하세요 (예: 010-1234-5678).';
            valid = false;
        }

        // 주소 필드 유효성 검사
        if (!address.trim()) {
            newErrors.address = '주소를 입력하세요.';
            valid = false;
        }

        // 에러 상태 업데이트
        setErrors(newErrors);

        return valid;
    };

    return (
        <div>
            <Container>
                <h1 className="text-center mt-4"></h1>
                <Form className="custom-form" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formUserId">
                        <Form.Label>아이디</Form.Label>
                        <Form.Control
                            name="userId"
                            type="text"
                            placeholder="아이디를 입력하세요"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className={errors.userId ? 'form-control is-invalid' : 'form-control'}
                        />
                        {errors.userId && <Form.Control.Feedback type="invalid">{errors.userId}</Form.Control.Feedback>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPw">
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control
                            name="pw"
                            type="pw"
                            placeholder="비밀번호를 입력하세요"
                            value={pw}
                            onChange={(e) => setPw(e.target.value)}
                            className={errors.pw ? 'form-control is-invalid' : 'form-control'}
                        />
                        {errors.pw && <Form.Control.Feedback type="invalid">{errors.pw}</Form.Control.Feedback>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formUserNm">
                        <Form.Label>이름</Form.Label>
                        <Form.Control
                            name="userNm"
                            type="text"
                            placeholder="이름을 입력하세요"
                            value={userNm}
                            onChange={(e) => setUserNm(e.target.value)}
                            className={errors.userNm ? 'form-control is-invalid' : 'form-control'}
                        />
                        {errors.userNm && <Form.Control.Feedback type="invalid">{errors.userNm}</Form.Control.Feedback>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>이메일</Form.Label>
                        <Form.Control
                            name="email"
                            type="email"
                            placeholder="이메일을 입력하세요"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={errors.email ? 'form-control is-invalid' : 'form-control'}
                        />
                        {errors.email && <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPhone">
                        <Form.Label>전화번호</Form.Label>
                        <Form.Control
                            name="phone"
                            type="text"
                            placeholder="전화번호를 입력하세요 (예: 010-1234-5678)"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className={errors.phone ? 'form-control is-invalid' : 'form-control'}
                        />
                        {errors.phone && <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAddress">
                        <Form.Label>주소</Form.Label>
                        <Form.Control
                            name="address"
                            as="textarea"
                            rows={3}
                            placeholder="주소를 입력하세요"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className={errors.address ? 'form-control is-invalid' : 'form-control'}
                        />
                        {errors.address && <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formRole">
                        <Form.Label>유형</Form.Label>
                        <Col>
                            <Form.Check
                                type="radio"
                                label="일반 사용자"
                                name="role"
                                id="user"
                                checked={role === 'user'}
                                onChange={() => setRole('user')}
                            />
                            <Form.Check
                                type="radio"
                                label="판매자"
                                name="role"
                                id="seller"
                                checked={role === 'seller'}
                                onChange={() => setRole('seller')}
                            />
                        </Col>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        가입
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default Join;