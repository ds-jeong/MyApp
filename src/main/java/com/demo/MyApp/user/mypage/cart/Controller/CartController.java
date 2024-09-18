package com.demo.MyApp.user.mypage.cart.Controller;

import com.demo.MyApp.user.mypage.cart.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/insertCart")
    public void insertCart(@RequestParam("id") Long id, @RequestParam("productId") Long productId, @RequestParam("quantity") Integer quantity, @RequestParam("price") Integer price) {
        cartService.insertCart(id, productId, quantity, price);
    }
}
