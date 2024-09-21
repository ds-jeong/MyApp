package com.demo.MyApp.user.order.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class UserOrderDto {
    private Long orderId;
    private LocalDateTime orderDate;
    /* 주문정보 */
    private String orderNumber; //주문번호
    private String orderer; //주문자
    private Long phone; //연락처
    private String email; //이메일

    /* 배송정보 */
    private String recipient; //받는사람
    private Long recipientPhone; //받는사람 연락처
    private String addr; //배송주소

    /* 상태값 */
    private String state;

    /* 총 결제금액 */
    private Long totalPayment;

    private Long id;
    private List<UserOrderDetailDto> orderDetails;
}
