package com.demo.MyApp.admin.product.entity;

import com.demo.MyApp.admin.product.dto.ProductDto;
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
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String productNm;

    @Column
    private double price;

    @Column
    private String author;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column
    private  String fileNm;

    @Column
    private  String filePath;

    @Column
    private  String productKind;

    @Column
    private int favorite;

    // Entity는 암묵적으로 Setter를 사용하지않음(정말 필요할때만 쓰기)
    // Setter 대신 데이터를 가공할때 호출할 메소드
    public static Product toEntity(ProductDto dto) {
        return Product.builder()
                .id(dto.getId())
                .productNm(dto.getProductNm())
                .content(dto.getContent())
                .author(dto.getAuthor())
                .price(dto.getPrice())
                .fileNm(dto.getFileNm())
                .filePath(dto.getFilePath())
                .productKind(dto.getProductKind())
                .build();
    }

}
