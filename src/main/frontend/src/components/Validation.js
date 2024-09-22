/* 이메일 유효성 검사 함수 */
export const ValidateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

/* 전화번호 유효성 검사 함수 (한국 기준) */
export const ValidatePhone = (phone) => {
    const phoneRegex = /^(01[0-9]{1})-([0-9]{3,4})-([0-9]{4})$|^(0[2-6][0-9])-([0-9]{3,4})-([0-9]{4})$/; // 예: 010-1234-5678
    return phoneRegex.test(phone);
};

/* 비밀번호 유효성 검사 함수 (최소 6자, 영문 대소문자 및 숫자 포함) */
export const ValidatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordRegex.test(password);
};