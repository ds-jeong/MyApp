package com.demo.MyApp.user.order.service;

import com.demo.MyApp.admin.product.entity.Product;
import com.demo.MyApp.admin.product.repository.ProductRepository;
import com.demo.MyApp.common.entity.User;
import com.demo.MyApp.common.repository.UserRepository;
import com.demo.MyApp.user.cart.entity.CartItem;
import com.demo.MyApp.user.cart.repository.CartItemRepository;
import com.demo.MyApp.user.order.repository.UserOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor //생성자 주입코드없이 의존성주입
public class UserOrderServiceImpl implements UserOrderService {

    @Autowired
    private UserOrderRepository userOrderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Map<String,Object>> orderCartItemDetail(Long id, List<Long> cartItemIds) throws Exception {

        /* 회원정보 */
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        /* 결과를 담을 List */
        List<Map<String,Object>> result = new ArrayList<>();

        /* 선택된 CartItem에 대한 정보를 조회 */
        for (Long cartItemId : cartItemIds) {
            CartItem cartItem = cartItemRepository.findById(cartItemId)
                    .orElseThrow(() -> new RuntimeException("CartItem not found"));

            /* 상품정보 */
            Product product = cartItem.getProduct(); // CartItem에서 Product를 get

            /* Map에 주문내역 정보 put */
            Map<String, Object> cartItemDetail = new HashMap<>();
            cartItemDetail.put("productId", product.getId());
            cartItemDetail.put("productNm", product.getProductNm());
            cartItemDetail.put("filePath", product.getFilePath());
            cartItemDetail.put("shipping", product.getShipping());
            cartItemDetail.put("quantity", cartItem.getQuantity());
            cartItemDetail.put("price", product.getPrice());
            cartItemDetail.put("totalPrice", cartItem.getQuantity() * product.getPrice());

            result.add(cartItemDetail);

        }
        return result;
    }
}
