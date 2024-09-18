package com.demo.MyApp.user.mypage.cart.service;

public interface CartService {

    void insertCart(Long id, Long productId, Integer quantity, Integer price);
}
