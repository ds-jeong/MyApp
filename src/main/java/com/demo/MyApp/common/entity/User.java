package com.demo.MyApp.common.entity;

import com.demo.MyApp.common.dto.UserDto;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import java.util.List;
import java.util.Set;

@ToString
@Getter
@Setter
@Builder
@DynamicUpdate
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @builder사용이 가능하도록..
@NoArgsConstructor //기본 생성자를 생성
@Entity //선언
@Table(name = "User")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;
    private String pw;
    private String userNm;
    private String phone;
    private String address;
    private String role;

    @Column(nullable=false, unique=true) //unique=true 해야함.
    private String email;

//    private String provider;
//    private Long providerId;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private UserProfile userProfile;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Wishlist> wishlists;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<CartItem> cartItems;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<RecentlyViewedItem> recentlyViewedItems;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Order> orders;

    // Entity는 암묵적으로 Setter를 사용하지않음(정말 필요할때만 쓰기)
    // Setter 대신 데이터를 가공할때 호출할 메소드
    public static User toEntity(UserDto dto) {
        return User.builder()
                .id(dto.getId())
                .userId(dto.getUserId())
                .pw(dto.getPw())
                .userNm(dto.getUserNm())
                .phone(dto.getPhone())
                .address(dto.getAddress())
                .role(dto.getRole())
                .email(dto.getEmail())
                .build();
    }

}
