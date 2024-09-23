import React, {useState} from 'react';
import Postcode from 'react-daum-postcode';
import './DaumAddrAPI.css';
import {Button, Form} from 'react-bootstrap';

/* 주소 API Component */
const DaumAddrAPI = ({onChange}) => {

    const [zonecode, setZonecode] = useState('');
    const [address1, setAddress1] = useState('');

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleAddressSelect = (data) => {
        /* 선택한 주소 설정 */
        const zonecode = data.zonecode;
        const address = data.address;

        /* 부모창에 우편번호, 주소 값전달*/
        onChange(zonecode, address);
        setZonecode(data.zonecode);
        setAddress1(data.address);

        /* 팝업 닫기 */
        setIsPopupOpen(false);
    };
    return (
        <div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Form.Control
                    type="text"
                    name="zonecode"
                    value={zonecode}
                    readOnly
                    placeholder="우편번호"
                    style={{width: '150px', marginRight: '10px'}}
                />
                <Button onClick={() => setIsPopupOpen(true)}>
                    주소 찾기
                </Button>
            </div>
                <Form.Control
                    type="text"
                    name="address1"
                    value={address1}
                    readOnly
                    placeholder="주소"/>
            {isPopupOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <Button className="close-btn" onClick={() => setIsPopupOpen(false)}>닫기</Button>
                        <Postcode
                            onComplete={handleAddressSelect}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default DaumAddrAPI;