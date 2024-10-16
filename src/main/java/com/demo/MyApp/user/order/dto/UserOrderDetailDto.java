package com.demo.MyApp.user.order.dto;

import com.demo.MyApp.admin.order.entity.OrderDetail;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class UserOrderDetailDto {
    private Long orderDetailId;
    private Long orderId;
    private Long productId;
    private int quantity;
    private double price;
    private String productNm;
}
