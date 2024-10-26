package com.demo.MyApp.user.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDto {
    private String imp_uid;      // Iamport에서 발급된 고유 ID
    private String merchant_uid; // 주문 고유 번호
    private Long paid_at;
    private int paid_amount;
    private String status;       // 결제 상태 (예: "paid", "failed" 등)
    private int checksum;

    // Convert Unix timestamp to LocalDateTime
    public LocalDateTime getPaidAtAsLocalDateTime() {
        return LocalDateTime.ofInstant(Instant.ofEpochSecond(paid_at), ZoneId.systemDefault());
    }

    public PaymentDto(String imp_uid, int paid_amount, int checksum) {
        this.imp_uid = imp_uid;
        this.paid_amount = paid_amount;
        this.checksum = checksum;
    }


}
