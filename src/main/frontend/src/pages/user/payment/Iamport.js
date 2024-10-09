import { useState, useEffect } from 'react';

const useIAMPORT = () => {
    const [imp, setImp] = useState(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.iamport.kr/js/iamport.payment-1.1.5.js';
        document.body.appendChild(script);
        script.onload = () => {
            setImp(window.IMP);
        };
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return imp;
};

export default useIAMPORT;