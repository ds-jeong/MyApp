package com.demo.MyApp.user.cart.controller;

import com.demo.MyApp.user.cart.dto.CartItemDto;
import com.demo.MyApp.user.cart.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/insertCart")
    public void insertCart(@RequestParam("id") Long id, @RequestParam("productId") Long productId, @RequestParam("quantity") Integer quantity, @RequestParam("price") Integer price) throws Exception {
        /* 사용자 > 장바구니 담기 */
        cartService.insertCart(id, productId, quantity, price);
    }

    @PostMapping("/cartItemList")
    public List<CartItemDto> cartItemList(@RequestParam("id") Long id) throws Exception {
        /* 사용자 > 장바구니 조회 */
        List<CartItemDto> cartItemList = cartService.cartItemList(id);
        return cartItemList;
    }

    @PostMapping("/deleteCartItem")
    public void deleteCartItem(@RequestParam("cartItemId") Long cartItemId) throws Exception {
        /* 사용자 > 장바구니 > 개별 상품 삭제 */
        cartService.deleteCartItem(cartItemId);
    }

    @PostMapping("/deleteCartItemselected")
    public void deleteCartItemselected(@RequestBody List<Long> cartItemIds) throws Exception {
        if (cartItemIds == null || cartItemIds.isEmpty()) {
            throw new IllegalArgumentException("No cart item IDs provided.");
        }
        /* 사용자 > 장바구니 > 선택 상품 삭제 */
        cartService.deleteCartItemselected(cartItemIds);
    }

}
