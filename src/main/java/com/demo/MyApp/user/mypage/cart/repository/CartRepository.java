package com.demo.MyApp.user.mypage.cart.repository;

import com.demo.MyApp.common.entity.User;
import com.demo.MyApp.user.mypage.cart.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUser(User user);
}
