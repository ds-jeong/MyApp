package com.demo.MyApp.user.payment.controller;

import com.demo.MyApp.user.payment.dto.PaymentDto;
import com.demo.MyApp.user.payment.service.PaymentService;
import com.demo.MyApp.user.payment.service.PaymentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/user/payment")
@RestController
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/save")
    public void savePayment(@RequestBody PaymentDto paymentDto) throws Exception {
        paymentService.processPaymentDone(paymentDto);
    }

}
