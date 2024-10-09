package com.demo.MyApp.user.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentRequestDto {
    private String imp_uid;      // Iamport에서 발급된 고유 ID
    private String merchant_uid; // 주문 고유 번호
    private String status;       // 결제 상태 (예: "paid", "failed" 등)
    private String buyer_email;  // 구매자 이메일
    private String buyer_name;   // 구매자 이름
    private String buyer_tel;    // 구매자 전화번호
    private String buyer_addr;   // 구매자 주소
    private String buyer_postcode; // 구매자 우편번호
    // 필요한 추가 필드들을 여기에 정의합니다.
}
