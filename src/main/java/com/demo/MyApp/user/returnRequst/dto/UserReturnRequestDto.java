package com.demo.MyApp.user.returnRequst.dto;

import com.demo.MyApp.admin.order.entity.OrderStatus;
import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class UserReturnRequestDto {
    private Long returnRequestId;  // 반품 요청 ID
    private Long orderId;  // 주문 ID
    private Long orderDetailId;  // 주문 상세 ID
    private Long userId;  // 사용자 ID
    private OrderStatus status;  // 주문 처리 상태
    private String reason;  // 반품 사유
    private String details;  // 상세 설명
    private LocalDateTime createdAt;  // 생성일
    private LocalDateTime updatedAt;  // 수정일
}
