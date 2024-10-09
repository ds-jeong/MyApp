package com.demo.MyApp.user.payment.service;

import com.demo.MyApp.admin.order.entity.Order;
import com.demo.MyApp.admin.order.repository.OrderRepository;
import com.demo.MyApp.common.entity.User;
import com.demo.MyApp.common.repository.UserRepository;
import com.demo.MyApp.user.payment.dto.PaymentRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class PaymentService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
//    private final PaymentRepository paymentRepository;
//    private final ProductManagementRepository productMgtRepository;
//
    public void processPaymentDone(PaymentRequestDto request) {

        Long orderId = request.getOrder_id();

        //orders 테이블에서 해당 부분 결제true 처리
        Order currentOrder = orderRepository.findById(orderId)
                .orElseThrow(() -> new NoSuchElementException("주문 정보를 찾을 수 없습니다."));
        currentOrder.setState("paid");

        // PaymentHistory 테이블에 저장할 Member 객체
        Long userId = currentOrder.getUser().getId();

        // PaymentHistory 테이블에 저장할 Orders 객체
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new NoSuchElementException("해당 주문서를 찾을 수 없습니다. Id : " + orderId));

        // 주문한 상품들에 대해 각각 결제내역 저장
//        createPaymentHistory(productMgtIdList, order, userId, request.get);

    }
//
//    // 결제내역 테이블 저장하는 메서드
//    private void createPaymentHistory(List<Long> productMgtIdList, Orders order, Member member, Long totalPrice) {
//        for (Long productMgtId : productMgtIdList) {
//
//            ProductManagement productMgt = productMgtRepository.findById(productMgtId)
//                    .orElseThrow(() -> new NoSuchElementException(ResponseMessageConstants.PRODUCT_NOT_FOUND));
//
//            Product product = productMgt.getProduct();
//            String option = productMgt.getColor().getColor() + ", " + productMgt.getSize().toString(); // 상품옵션 문자열로 저장
//
//            PaymentHistory paymentHistory = new PaymentHistory(member, order, product, product.getProductName(),option,product.getPrice(),totalPrice);
//
//            paymentRepository.save(paymentHistory);
//
//        }
//    }
}