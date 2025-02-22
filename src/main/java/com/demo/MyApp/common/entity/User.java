package com.demo.MyApp.common.entity;

import com.demo.MyApp.admin.order.entity.Order;
import com.demo.MyApp.common.dto.UserDto;
import com.demo.MyApp.user.cart.entity.Cart;
import com.demo.MyApp.user.review.entity.RecentlyViewedItem;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
@DynamicUpdate
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @builder사용이 가능하도록..
@NoArgsConstructor //기본 생성자를 생성
@Entity //선언
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    //id -> 식별id, username -> 회원가입시 아이디
    private String userId;
    private String pw;
    private String userNm;
    private String phone;
    private String address;
    private String role;

    //    private String provider;
//    private Long providerId;

    @Column(nullable=false, unique=true) //unique=true 해야함.
    private String email;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private UserProfile userProfile;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Wishlist> wishlists;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ToString.Exclude
    private Cart cart;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<RecentlyViewedItem> recentlyViewedItems;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Order> orders;

    public User(String userId, String pw, List<SimpleGrantedAuthority> authorities) {
    }


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
