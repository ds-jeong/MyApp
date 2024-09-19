package com.demo.MyApp.user.mypage.cart.service;

import com.demo.MyApp.user.mypage.cart.dto.CartItemDto;

import java.util.List;

public interface CartService {

    void insertCart(Long id, Long productId, Integer quantity, Integer price) throws Exception;

    List<CartItemDto> cartItemList(Long id) throws Exception;

    void deleteCartItem(Long cartItemId) throws Exception;

    void deleteCartItemselected(List<Long> cartItemIds) throws Exception;
}
