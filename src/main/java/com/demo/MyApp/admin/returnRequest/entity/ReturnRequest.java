package com.demo.MyApp.admin.returnRequest.entity;

import com.demo.MyApp.admin.order.entity.Order;
import com.demo.MyApp.admin.order.entity.OrderDetail;
import com.demo.MyApp.admin.order.entity.OrderStatus;
import com.demo.MyApp.common.entity.User;
import com.demo.MyApp.user.returnRequst.dto.UserReturnRequestDto;
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
@Table(name = "returnRequest")
public class ReturnRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long returnRequestId;

    @ManyToOne
    private Order order; // 주문번호

    @ManyToOne
    private OrderDetail orderDetail; // 주문상세번호

    @ManyToOne
    private User user; // 사용자

    @Enumerated(EnumType.STRING)
    private OrderStatus status; // 처리 상태

    private String reason; // 반품 사유
    private String details; // 상세 설명

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now(); // 현재 날짜와 시간 설정
        updatedAt = LocalDateTime.now(); // 현재 날짜와 시간 설정
    }

    // Entity는 암묵적으로 Setter를 사용하지않음(정말 필요할때만 쓰기)
    // Setter 대신 데이터를 가공할때 호출할 메소드
    public static ReturnRequest toEntity(UserReturnRequestDto dto) {
        return ReturnRequest.builder()
                .returnRequestId(dto.getReturnRequestId())
                .reason(dto.getReason())
                .createdAt(dto.getCreatedAt())
                .updatedAt(dto.getUpdatedAt())
                .build();
    }
}

