package com.demo.MyApp.user.payment.service;

import com.demo.MyApp.user.payment.dto.PaymentDto;

public interface PaymentService {
    void processPaymentDone(PaymentDto paymentDto) throws Exception;


}
