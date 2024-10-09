package com.demo.MyApp.user.payment.controller;

import com.demo.MyApp.user.payment.dto.PaymentRequestDto;
import com.demo.MyApp.user.payment.service.PaymentService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/user/order/payment")
@Controller
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/process/{orderId}")
    public void processPayment(@PathVariable String orderId, @RequestBody PaymentRequestDto paymentRequestDto) {

        try {
            paymentService.processPaymentDone(paymentRequestDto);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}
