package com.demo.MyApp.user.cart.entity;

import com.demo.MyApp.common.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import java.util.Set;


@Getter
@Setter
@Builder
@DynamicUpdate
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @builder사용이 가능하도록..
@NoArgsConstructor //기본 생성자를 생성
@Entity //선언
@Table(name = "cart")
@EqualsAndHashCode(callSuper = false, exclude = "user")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartId;

    @OneToOne
    @JoinColumn(name = "id", unique = true)
    @ToString.Exclude
    private User user;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CartItem> items;

}
