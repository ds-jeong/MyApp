package com.demo.MyApp.common.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;

@ToString
@Getter
@Builder
@DynamicUpdate
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "change_order")
public class ChangeOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    private String type;

    private String state;

    private LocalDateTime retreive_date;

    private String reason;

    private String request;
}
