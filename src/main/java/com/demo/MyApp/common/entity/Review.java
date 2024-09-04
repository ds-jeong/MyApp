package com.demo.MyApp.common.entity;

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
@Table(name = "review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String content;

    private String fileNm;

    private String filePath;

    private int views;

    private int like;

    private byte rating;

    @OneToOne
    @JoinColumn(name = "order_detail_id")  // 외래 키 컬럼
    private OrderDetail orderDetail;
}


