package com.demo.MyApp.user.payment.entity;

import com.demo.MyApp.admin.order.entity.Order;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "payment")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;                     // 기본 키

    @Column(nullable = false, unique = true)
    private String impUid;               // Iamport에서 발급된 결제 고유 ID

    @Column(nullable = false)
    private String merchantUid;          // 주문 고유 번호

    @Column(nullable = false)
    private BigDecimal amount;           // 결제 금액

    @Column(nullable = false)
    private String status;               // 결제 상태 (예: "paid", "failed", "cancelled")

    @OneToOne
    private Order order;

    @Column(updatable = false)
    private LocalDateTime createdAt;     // 생성 일시

    @Column(insertable = false)
    private LocalDateTime updatedAt;     // 수정 일시

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
