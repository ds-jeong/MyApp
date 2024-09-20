package com.demo.MyApp.user.cart.service;

import com.demo.MyApp.user.cart.dto.CartItemDto;

import java.util.List;

public interface CartService {

    void insertCart(Long id, Long productId, Integer quantity, Integer price) throws Exception;

    List<CartItemDto> cartItemList(Long id) throws Exception;

    void deleteCartItem(Long cartItemId) throws Exception;

    void deleteCartItemselected(List<Long> cartItemIds) throws Exception;

}
