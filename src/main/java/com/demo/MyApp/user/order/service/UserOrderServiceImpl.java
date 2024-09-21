package com.demo.MyApp.user.order.service;

import com.demo.MyApp.admin.order.entity.Order;
import com.demo.MyApp.admin.order.entity.OrderDetail;
import com.demo.MyApp.admin.product.entity.Product;
import com.demo.MyApp.admin.product.repository.ProductRepository;
import com.demo.MyApp.common.entity.User;
import com.demo.MyApp.common.repository.UserRepository;
import com.demo.MyApp.user.cart.entity.Cart;
import com.demo.MyApp.user.cart.entity.CartItem;
import com.demo.MyApp.user.cart.repository.CartItemRepository;
import com.demo.MyApp.user.order.dto.UserOrderDetailDto;
import com.demo.MyApp.user.order.dto.UserOrderDto;
import com.demo.MyApp.user.order.repository.UserOrderDetailRepository;
import com.demo.MyApp.user.order.repository.UserOrderRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.sql.Date;
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
    private UserOrderDetailRepository userOrderDetailRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private final ProductRepository productRepository;

    /* 주문번호 생성 */
    private static final String PREFIX = "ON"; // 고정 접두사
    private static final String NUMERIC_CHARACTERS = "0123456789"; // 숫자
    private static final int FIRST_PART_LENGTH = 4; // 첫 번째 숫자 부분 길이
    private static final int SECOND_PART_LENGTH = 4; // 두 번째 숫자 부분 길이

    /* 예시 : ON1234-5678  */
    public static String generateOrderNumber() {
        SecureRandom random = new SecureRandom();
        StringBuilder orderNumber = new StringBuilder(PREFIX);

        /* 첫 번째 부분 생성 */
        for (int i = 0; i < FIRST_PART_LENGTH; i++) {
            int index = random.nextInt(NUMERIC_CHARACTERS.length());
            orderNumber.append(NUMERIC_CHARACTERS.charAt(index));
        }

        orderNumber.append("-"); // 구분자 추가

        /* 두 번째 부분 생성 */
        for (int i = 0; i < SECOND_PART_LENGTH; i++) {
            int index = random.nextInt(NUMERIC_CHARACTERS.length());
            orderNumber.append(NUMERIC_CHARACTERS.charAt(index));
        }

        return orderNumber.toString();
    }

    @Override
    public List<Map<String,Object>> orderCartItemDetail(Long id, List<Long> cartItemIds) throws Exception {

        /* 결과를 담을 List */
        List<Map<String,Object>> result = new ArrayList<>();

        /* 선택된 CartItem에 대한 정보를 조회 */
        for (Long cartItemId : cartItemIds) {
            CartItem cartItem = cartItemRepository.findById(cartItemId)
                    .orElseThrow(() -> new RuntimeException("CartItem not found"));

            /* 상품정보 */
            Product product = cartItem.getProduct(); /* CartItem에서 Product를 get */

            /* Map에 주문내역 정보 put */
            Map<String, Object> cartItemDetail = new HashMap<>();
            cartItemDetail.put("productId", product.getProductId());
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

    @Transactional
    @Override
    public void insertOrder(UserOrderDto userOrderDto) throws Exception {

        /* 회원정보 */
        User user = userRepository.findById(userOrderDto.getId())
                .orElseThrow(() -> new RuntimeException("id not found"));

        /* 주문번호 */
        String orderNumber = generateOrderNumber();

        Order order = new Order();
        order.setUser(user);
        order.setOrderNumber(orderNumber);
        order.setState("주문완료");
        order.setOrderer(userOrderDto.getOrderer());
        order.setAddr(userOrderDto.getAddr());
        order.setPhone(userOrderDto.getPhone());
        order.setEmail(userOrderDto.getEmail());
        order.setRecipient(userOrderDto.getRecipient());
        order.setRecipientPhone(userOrderDto.getRecipientPhone());
        order.setTotalPayment(userOrderDto.getTotalPayment());

        /* Order에 주문정보 put */
        userOrderRepository.save(order);

        for (UserOrderDetailDto userOrderDetailDto  : userOrderDto.getOrderDetails()){

            /* 상품정보 */
            Product product = productRepository.findById(userOrderDetailDto.getProductId())
                    .orElseThrow(() -> new RuntimeException("product not found"));

            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setQuantity(userOrderDetailDto.getQuantity());
            orderDetail.setOrder(order);
            orderDetail.setProduct(product);

            /* OrderDetail에 주문상세정보 put */
            userOrderDetailRepository.save(orderDetail);
        }

    }
}
