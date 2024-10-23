package com.demo.MyApp.user.payment.service;

import com.demo.MyApp.admin.order.entity.Order;
import com.demo.MyApp.user.order.repository.UserOrderRepository;
import com.demo.MyApp.user.payment.dto.PaymentDto;
import com.demo.MyApp.user.payment.entity.Payment;
import com.demo.MyApp.user.payment.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class PaymentServiceImpl implements PaymentService {

    private final UserOrderRepository userOrderRepository;
    private final PaymentRepository paymentRepository;

    public void processPaymentDone(PaymentDto paymentDto) {
        String imp_uid = paymentDto.getImp_uid();
        String merchant_uid = paymentDto.getMerchant_uid();
        String substr_mUid =  merchant_uid.substring(merchant_uid.indexOf("ON"));
        LocalDateTime paid_at = paymentDto.getPaidAtAsLocalDateTime();
        int amount = paymentDto.getPaid_amount();

        System.out.println("paid_at" + paid_at);

        //orders 테이블에서 해당 부분 결제완료 처리
        Order currentOrder;
        try {
           currentOrder = userOrderRepository.findOrderByOrderNumber(substr_mUid);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        currentOrder.setState("결제완료");

        Payment newPayment = new Payment();
        newPayment.setOrder(currentOrder);
        newPayment.setStatus("결제완료");
        newPayment.setImpUid(imp_uid);
        newPayment.setMerchantUid(merchant_uid);
        newPayment.setPaid_at(paid_at);
        newPayment.setAmount(amount);

        paymentRepository.save(newPayment);
    }

}