package com.demo.MyApp.user.cart.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class CartItemDto {
    private Long cartItemId;
    private Long productId;
    private int quantity;
    private String productNm; // 상품명
    private double price; // 상품 가격
}
