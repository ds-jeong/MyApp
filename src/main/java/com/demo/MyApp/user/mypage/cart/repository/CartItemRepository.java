package com.demo.MyApp.user.mypage.cart.repository;

import com.demo.MyApp.admin.product.entity.Product;
import com.demo.MyApp.user.mypage.cart.entity.Cart;
import com.demo.MyApp.user.mypage.cart.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    CartItem findByCartAndProduct(Cart cart, Product product);

    List<CartItem> findByCart(Cart cart);
}
