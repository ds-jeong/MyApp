package com.demo.MyApp.admin.product.entity;

import com.demo.MyApp.admin.product.dto.ProductDto;
import com.demo.MyApp.common.entity.*;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import java.util.Set;

@ToString
@Getter
@Setter
@Builder
@DynamicUpdate
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @builder사용이 가능하도록..
@NoArgsConstructor //기본 생성자를 생성
@Entity //선언
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long id;

    private String productNm;
    private double price;
    private String author;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    private  String fileNm;
    private  String filePath;
    private Integer favorite; //좋아요
    private Integer views; //조회수
    private String category;//카테고리

    // 구매율 관련 정보
    private Integer totalSales;  // 총 판매량
    private Double purchaseRate;  // 구매율 (판매량 / 조회수 등으로 계산된 값)

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Wishlist> wishlists;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<CartItem> cartItems;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<RecentlyViewedItem> recentlyViewedItems;

//    @ManyToOne
//    @JoinColumn(name = "category_nm", nullable = false)
//    private Category category;  // 상품이 속한 카테고리

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<ProductOption> options;  // 상품 옵션

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
                .build();
    }

}
