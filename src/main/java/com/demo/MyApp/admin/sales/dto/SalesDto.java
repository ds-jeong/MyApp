package com.demo.MyApp.admin.sales.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SalesDto {

    private Long orderId;
    private Long productId;
    private Long totalQuantity;
    private Long totalRevenue;
    private Long totalOrders;
    private LocalDateTime orderDate;

    public SalesDto(Long size, Long totalRevenue) {
        this.totalRevenue = totalRevenue;
        this.totalOrders = size;
    }

    public SalesDto(Long totalRevenue, LocalDateTime orderDate) {
        this.totalRevenue = totalRevenue;
        this.orderDate = orderDate;
    }
}
