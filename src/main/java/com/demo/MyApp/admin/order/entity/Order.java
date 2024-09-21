package com.demo.MyApp.admin.order.entity;

import com.demo.MyApp.admin.product.entity.Product;
import com.demo.MyApp.common.entity.ChangeOrder;
import com.demo.MyApp.common.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;

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

    private LocalDateTime orderDate;

    /* 주문정보 */
    private String orderNumber; //주문번호
    private String orderer; //주문자
    private Long phone; //연락처
    private String email; //이메일

    /* 배송정보 */
    private String recipient; //받는사람
    private Long recipientPhone; //받는사람 연락처
    private String addr; //배송주소

    /* 상태값 */
    private String state;

    /* 총 결제금액 */
    private Long totalPayment;

    @PrePersist
    protected void onCreate() {
        orderDate = LocalDateTime.now(); // 현재 날짜와 시간 설정
    }

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Product> products;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderDetail> orderDetails;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChangeOrder> changeOrders;
}
