export const FormatPhoneNumber = (value) => {
    // 숫자만 남기기
    const numericValue = value.replace(/\D/g, '');
    let formattedValue = '';

    if (numericValue.length < 3) {
        formattedValue = numericValue;
    } else if (numericValue.length <= 7) {
        formattedValue = `${numericValue.slice(0, 3)}-${numericValue.slice(3)}`;
    } else {
        formattedValue = `${numericValue.slice(0, 3)}-${numericValue.slice(3, 7)}-${numericValue.slice(7, 11)}`;
    }

    return formattedValue;
};