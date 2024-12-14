package com.demo.MyApp.admin.shipping.dto;

import com.demo.MyApp.admin.order.entity.OrderStatus;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShippingDto {

    private Long orderId;
    private String orderNumber;
    private Date orderDate;
    private String recipient;
    private OrderStatus status;

}
