// src/utils/useIamport.js

import { useEffect } from 'react';

const UseIamport = () => {
    useEffect(() => {
        if (window.IMP) return; // 이미 로드된 경우

        const script = document.createElement('script');
        script.src = 'https://cdn.iamport.kr/js/iamport.payment-1.1.5.js';
        script.async = true;
        script.onload = () => {
            console.log('Iamport script loaded');
        };
        script.onerror = () => {
            console.error('Failed to load Iamport script');
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);
};

export default UseIamport;
