package com.demo.MyApp.user.payment.entity;

import com.demo.MyApp.admin.order.entity.Order;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "payment")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;                     // 기본 키

    @Column(nullable = false, unique = true)
    private String impUid;               // Iamport에서 발급된 결제 고유 ID

    @Column(nullable = false)
    private String merchantUid;          // 주문 고유 번호

    @Column(nullable = false)
    private int amount;           // 결제 금액

    @Column(nullable = false)
    private String status;               // 결제 상태 (예: "paid", "failed", "cancelled")

    private int checksum; // 결제 검증용

    @OneToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @Column(updatable = false)
    private LocalDateTime paid_at;     // 생성 일시

    private LocalDateTime updatedAt; // 수정 일시

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now(); // 현재 시간으로 업데이트
    }

}
