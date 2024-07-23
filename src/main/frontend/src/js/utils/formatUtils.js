// utils/formatUtils.js

// 가격을 3자리 마다 콤마를 추가하는 함수
export const addCommasToPrice = (price) => {
    // 입력된 값이 숫자가 아니면 그대로 반환
    if (isNaN(price)) {
        return price;
    }

    // 숫자를 문자열로 변환
    let priceStr = String(price);

    // 소수점 위치 파악
    let dotIndex = priceStr.indexOf('.');
    let decimalPart = '';

    if (dotIndex > -1) {
        decimalPart = priceStr.substring(dotIndex); // 소수 부분 추출
        priceStr = priceStr.substring(0, dotIndex); // 정수 부분 추출
    }

    // 정수 부분에 콤마 추가
    priceStr = priceStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // 소수 부분 다시 추가
    priceStr += decimalPart;

    return priceStr;
};

// 가격 포맷팅 함수
export const formatPrice = (price, locale = 'ko-KR', currency = 'KRW') => {
    if (isNaN(price) || price === null || price === undefined) {
        return '';
    }

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
    }).format(price);
};

// 날짜 포맷팅 함수
export const formatDate = (dateString, locale = 'en-US', options = {}) => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return '';
    }

    return date.toLocaleDateString(locale, options);
};
