package com.demo.MyApp.common.entity;

import com.demo.MyApp.admin.product.entity.Product;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;


@ToString
@Getter
@Builder
@DynamicUpdate
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "order")
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int quantity;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @OneToOne(mappedBy = "orderDetail", cascade = CascadeType.ALL, orphanRemoval = true)
    private Review review;
}
