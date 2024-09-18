package com.demo.MyApp.user.mypage.cart.service;

import com.demo.MyApp.admin.product.entity.Product;
import com.demo.MyApp.admin.product.repository.ProductRepository;
import com.demo.MyApp.common.entity.User;
import com.demo.MyApp.common.repository.UserRepository;
import com.demo.MyApp.user.mypage.cart.entity.Cart;
import com.demo.MyApp.user.mypage.cart.entity.CartItem;
import com.demo.MyApp.user.mypage.cart.repository.CartItemRepository;
import com.demo.MyApp.user.mypage.cart.repository.CartRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements CartService{

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    @Override
    public void insertCart(Long id, Long productId, Integer quantity, Integer price) {

        /* 회원정보 */
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("id not found"));

        /* 상품정보 */
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        /* 장바구니 */
        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> {
                    /* 장바구니가 비어있을때 */
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    /* 새로운 장바구니 생성 */
                    return cartRepository.save(newCart);
                });

        /* 장바구니 상세 */
        /* 중복 확인 로직 */
        CartItem existingItem = cartItemRepository.findByCartAndProduct(cart, product);
        if (existingItem != null) {
            /* 이미 존재하는 경우 수량 증가 */
            existingItem.setQuantity(existingItem.getQuantity() + quantity);
            cartItemRepository.save(existingItem);
        } else {
            /* 장바구니 상세 */
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setProduct(product);
            newItem.setQuantity(quantity);
            newItem.setPrice(price);
            cartItemRepository.save(newItem);
        }

    }
}
