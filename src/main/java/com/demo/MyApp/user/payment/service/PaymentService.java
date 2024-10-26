package com.demo.MyApp.user.payment.service;

import com.demo.MyApp.user.payment.dto.PaymentDto;

import java.time.LocalDateTime;

public interface PaymentService {
    void processPaymentDone(PaymentDto paymentDto) throws Exception;

    String getAccessToken() throws Exception;

    PaymentDto getPaymentInfo(Long orderId) throws Exception;

    String processPaymentCancel(PaymentDto paymentDto, String reason);

    void modifyPaymentInfo(Long orderId, LocalDateTime updatedAt);
}
