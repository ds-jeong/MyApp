package com.demo.MyApp.user.review.entity;

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
@Table(name = "review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    private String title;

    private String content;

    private String fileNm;

    private String filePath;

    private int views;

    private int favorite;

    private byte rating;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now(); // 현재 날짜와 시간 설정
        updatedAt = LocalDateTime.now(); // 현재 날짜와 시간 설정
    }

//    @OneToOne
//    @JoinColumn(name = "order_detail_id")  // 외래 키 컬럼
//    private OrderDetail orderDetail;
}

