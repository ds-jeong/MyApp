package com.demo.MyApp.user.order.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class OrderCancelDto {
    private Long orderId;
    private Long orderDetailId;
    private Long productId;
    private String reason;  // 반품 사유
}
