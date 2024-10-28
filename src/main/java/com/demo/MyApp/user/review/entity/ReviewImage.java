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
@Table(name = "reviewImage")
public class ReviewImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewImageId;

    private String fileNm;

    private String filePath;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now(); // 현재 날짜와 시간 설정
        updatedAt = LocalDateTime.now(); // 현재 날짜와 시간 설정
    }

    @ManyToOne
    @JoinColumn(name = "review_id", nullable = false)
    @ToString.Exclude // Prevent circular reference in toString()
    private Review review;

}
