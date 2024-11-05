package com.demo.MyApp.admin.order.entity;

import com.demo.MyApp.common.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;

@ToString
@Getter
@Setter
@Builder
@DynamicUpdate
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @builder사용이 가능하도록..
@NoArgsConstructor //기본 생성자를 생성
@Entity //선언
@Table(name = "orderStatusHist")
public class OrderStatusHist{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderStatusHistId;

    @ManyToOne
    private OrderDetail orderDetail; // 주문상세번호

    @ManyToOne
    private User user; // 사용자

    @Enumerated(EnumType.STRING)
    private OrderStatus status;  // 주문 처리 상태

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now(); // 현재 날짜와 시간 설정
        updatedAt = LocalDateTime.now(); // 현재 날짜와 시간 설정
    }
}
