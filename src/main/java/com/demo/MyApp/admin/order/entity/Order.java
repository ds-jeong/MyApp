package com.demo.MyApp.admin.order.entity;

import com.demo.MyApp.admin.product.entity.Product;
import com.demo.MyApp.common.entity.ChangeOrder;
import com.demo.MyApp.common.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;
import java.util.List;

@ToString
@Getter
@Setter
@Builder
@DynamicUpdate
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @builder사용이 가능하도록..
@NoArgsConstructor //기본 생성자를 생성
@Entity //선언
@Table(name = "`order`")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @Column(name="order_date")
    private LocalDateTime orderDate;

    /* 주문정보 */
    @Column(unique = true, name="order_number")
    private String orderNumber; //주문번호
    private String orderer; //주문자
    private String phone; //연락처
    private String email; //이메일

    /* 배송정보 */
    private String recipient; //받는사람
    private String recipientPhone; //받는사람 연락처
    private String zonecode; //우편번호
    private String addr; //배송주소

    private String trackingNumber; //운송장코드
    private String shippingCompany; //배송업체

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status; // 처리 상태

    /* 총 결제금액 */
    @Column(name = "total_payment")
    private Long totalPayment;

    @PrePersist
    protected void onCreate() {
        orderDate = LocalDateTime.now(); // 현재 날짜와 시간 설정
    }

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @ToString.Exclude // Prevent circular reference in toString()
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude // Prevent circular reference in toString(
    private List<Product> products;

    @JsonIgnore
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude // Prevent circular reference in toString()
    private List<OrderDetail> orderDetails;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude // Prevent circular reference in toString()
    private List<ChangeOrder> changeOrders;

}
