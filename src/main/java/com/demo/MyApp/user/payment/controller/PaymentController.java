package com.demo.MyApp.user.payment.controller;

import com.demo.MyApp.user.payment.dto.IamportCancelDto;
import com.demo.MyApp.user.payment.dto.PaymentDto;
import com.demo.MyApp.user.payment.service.PaymentService;
import com.demo.MyApp.user.payment.service.PaymentServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

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

    @GetMapping("/info")
    public PaymentDto getPaymentInfo(Long orderId) throws Exception {
        return paymentService.getPaymentInfo(orderId);
    }

    @PostMapping("/cancel")
    public ResponseEntity<String> cancelPayment(@RequestParam("orderId") Long orderId, // orderId 파라미터를 받음
                                                @RequestParam("reason") String reason) throws Exception {

        PaymentDto payment = paymentService.getPaymentInfo(orderId);
        if(payment == null) {
            System.out.println("주문 정보 없음");
        }

        if(payment.getChecksum() == 0) {
            return ResponseEntity.badRequest().body("이미 전액 환불된 주문입니다.");
        }

        String response = paymentService.processPaymentCancel(payment, reason);
        System.out.println("47번쨰 줄 : " + response);
        int code = -1;
        String message = "";
        Long failedAt = 0L;
        LocalDateTime updateAt = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            IamportCancelDto mappedResponse = objectMapper.readValue(response, IamportCancelDto.class);

            // 각 요소를 추출
            code = mappedResponse.getCode();
            message = mappedResponse.getMessage();
            IamportCancelDto.ResponseData responseData = mappedResponse.getResponseData();

            failedAt = responseData.getFailed_at();
            updateAt = responseData.getCancelledAtAsLocalDateTime();

            System.out.println("Failed at: " + failedAt);

            System.out.println("Code: " + code);
            System.out.println("Message: " + message);
            System.out.println("Response: " + responseData);
        } catch (Exception e) {
            e.printStackTrace();
        }

        if(code == 0 && failedAt == 0) { //failed_at은 0 인 경우 정상적으로 환불 된 것
            paymentService.modifyPaymentInfo(orderId, updateAt);
            return ResponseEntity.ok("payment canceled successfully");
        }
        else {
            return ResponseEntity.badRequest().body(message);
        }
    }


}
