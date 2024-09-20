package com.demo.MyApp.user.cart.service;

import com.demo.MyApp.admin.product.entity.Product;
import com.demo.MyApp.admin.product.repository.ProductRepository;
import com.demo.MyApp.common.entity.User;
import com.demo.MyApp.common.repository.UserRepository;
import com.demo.MyApp.user.cart.dto.CartItemDto;
import com.demo.MyApp.user.cart.entity.Cart;
import com.demo.MyApp.user.cart.entity.CartItem;
import com.demo.MyApp.user.cart.repository.CartItemRepository;
import com.demo.MyApp.user.cart.repository.CartRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
    public void insertCart(Long id, Long productId, Integer quantity, Integer price) throws Exception{

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

    @Transactional
    @Override
    public List<CartItemDto> cartItemList(Long id) throws Exception {

        /* 회원정보 */
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("id not found"));

        /* 장바구니 */
        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("cart not found"));

        /* 장바구니 상세*/
        List<CartItem> cartItems = cartItemRepository.findByCart(cart);

        /* CartItemDto 를 만들어서 상품 정보를 추가 */
        List<CartItemDto> cartItemDto = new ArrayList<>();
        for (CartItem cartItem : cartItems) {
            Product product = productRepository.findById(cartItem.getProduct().getId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            /* DTO 생성 */
            CartItemDto dto = new CartItemDto();
            dto.setCartItemId(cartItem.getCartItemId());
            dto.setProductId(cartItem.getProduct().getId());
            dto.setQuantity(cartItem.getQuantity());
            dto.setProductNm(product.getProductNm());
            dto.setPrice(product.getPrice());

            cartItemDto.add(dto);
        }


        return cartItemDto;
    }

    @Override
    public void deleteCartItem(Long cartItemId) throws Exception {
        cartItemRepository.deleteById(cartItemId);
    }

    @Override
    public void deleteCartItemselected(List<Long> cartItemIds) throws Exception {
        for(long cartItemId : cartItemIds){
            cartItemRepository.deleteById(cartItemId);
        }
    }

}
