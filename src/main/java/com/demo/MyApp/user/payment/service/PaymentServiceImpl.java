package com.demo.MyApp.user.payment.service;

import com.demo.MyApp.admin.order.entity.Order;
import com.demo.MyApp.admin.order.entity.OrderStatus;
import com.demo.MyApp.user.order.repository.UserOrderRepository;
import com.demo.MyApp.user.payment.dto.PaymentDto;
import com.demo.MyApp.user.payment.entity.Payment;
import com.demo.MyApp.user.payment.repository.PaymentRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
@Transactional(rollbackFor = Exception.class)
public class PaymentServiceImpl implements PaymentService {

    private final UserOrderRepository userOrderRepository;
    private final PaymentRepository paymentRepository;
    private final WebClient webClient;

    private final ObjectMapper objectMapper = new ObjectMapper();


    @Value("${iamport.apikey}")
    private String apiKey;

    @Value("${iamport.secretkey}")
    private String secretKey;

    public PaymentServiceImpl(WebClient.Builder webClientBuilder, UserOrderRepository userOrderRepository, PaymentRepository paymentRepository) {
        this.webClient = webClientBuilder.baseUrl("http://localhost:8081").build();
        this.userOrderRepository = userOrderRepository;
        this.paymentRepository = paymentRepository;
    }

    //결제 성공+실패 한번에 다룸
    public void processPaymentDone(PaymentDto paymentDto) {
        String imp_uid = paymentDto.getImp_uid();
        String merchant_uid = paymentDto.getMerchant_uid();
        String substr_mUid = merchant_uid.substring(merchant_uid.indexOf("ON"));
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
        //결제 실패 경우에만 처리해주면 됨.(주문성공 == 결제성공 처리)
        if(paymentDto.getStatus().equals("failed")) {
            currentOrder.setStatus(OrderStatus.PAYMENT_FAILED);
            currentOrder.setStatus(OrderStatus.PAYMENT_FAILED);
        }

        Payment newPayment = new Payment();
        newPayment.setOrder(currentOrder);
        newPayment.setImpUid(imp_uid);
        newPayment.setMerchantUid(merchant_uid);
        newPayment.setPaid_at(paid_at);
        
        if(paymentDto.getStatus().equals("failed")) {
            newPayment.setStatus(OrderStatus.PAYMENT_FAILED);
            newPayment.setAmount(-1);
            newPayment.setChecksum(0); 
        }
        else {
            newPayment.setStatus(OrderStatus.PAYMENT_COMPLETED);
            newPayment.setAmount(amount);
            newPayment.setChecksum(amount); //인증용은 계산 값과 동일
        }

        paymentRepository.save(newPayment);
    }
    
    public String processPaymentCancel(PaymentDto paymentDto, String reason) {
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("reason", reason);
        requestBody.put("imp_uid", paymentDto.getImp_uid());
        requestBody.put("amount", paymentDto.getPaid_amount());
        requestBody.put("checksum", paymentDto.getChecksum());


        return webClient.post()
                .uri("https://api.iamport.kr/payments/cancel")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, getAccessToken())
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class) // 응답을 String으로 받음
                .block();
    }

    public String getAccessToken() {
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("imp_key", apiKey);
        requestBody.put("imp_secret", secretKey);

        // Block to get the access token as a String
        return webClient.post()
                .uri("https://api.iamport.kr/users/getToken")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class) // Get the response body as a String
                .map(responseBody -> {
                    try {
                        JsonNode jsonNode = objectMapper.readTree(responseBody); // Parse the JSON response
                        return jsonNode.path("response").path("access_token").asText(); // Extract the access_token
                    } catch (Exception e) {
                        throw new RuntimeException("Failed to parse JSON response", e);
                    }
                })
                .block(); // Block to wait for the result (비동기 코드를 동기화로 만들어줌)
    }


    public PaymentDto getPaymentInfo(Long orderId) {
        return paymentRepository.findPaymentsByOrderId(orderId);
    }

    public void modifyPaymentInfo(Long orderId, LocalDateTime updatedAt){
        paymentRepository.updatePaymentByOrderId(orderId, "환불완료", 0, updatedAt);
    }


}