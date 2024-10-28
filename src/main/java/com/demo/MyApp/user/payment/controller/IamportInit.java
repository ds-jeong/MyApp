package com.demo.MyApp.user.payment.controller;

//import com.demo.MyApp.user.payment.dto.Payment;
import com.demo.MyApp.user.payment.dto.PaymentDto;
import com.demo.MyApp.user.payment.service.PaymentServiceImpl;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class IamportInit {

    @Value("${iamport.apikey}")
    private String apiKey;

    @Value("${iamport.secretkey}")
    private String secretKey;

    private IamportClient iamportClient;

    private PaymentServiceImpl paymentServiceImpl;
    @PostConstruct
    public void init() {
        this.iamportClient = new IamportClient(apiKey, secretKey);
    }

    @PostMapping("/order/payment/{imp_uid}")
    public IamportResponse<Payment> validateIamport(@PathVariable String imp_uid, @RequestBody PaymentDto request) throws IamportResponseException, IOException {

        IamportResponse<Payment> payment = iamportClient.paymentByImpUid(imp_uid);

        System.out.println("결제 요청 응답. 결제 내역 - 주문 번호: {}" + payment.getResponse().getMerchantUid());

//        paymentService.processPaymentDone(request);

        return payment;
    }

//    //결제내역조회
//    @GetMapping("/paymenthistory/{memberId}")
//    public ResponseEntity<List<PaymentHistoryDto>> paymentList(@PathVariable Long memberId) {
//        return ResponseEntity.status(HttpStatus.OK).body(paymentService.paymentHistoryList(memberId));
//    }
}
