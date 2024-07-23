package com.demo.MyApp.common.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

@ToString
@Getter
@Setter
@Builder
@DynamicUpdate
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @builder사용이 가능하도록..
@NoArgsConstructor //기본 생성자를 생성
@Entity //선언
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryId;

    private String categoryNm;
    private String description;

    @ManyToOne
    @JoinColumn(name = "storeId")
    private Store storeId;
}
