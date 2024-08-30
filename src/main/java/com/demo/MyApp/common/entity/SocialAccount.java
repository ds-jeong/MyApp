package com.demo.MyApp.common.entity;

import com.demo.MyApp.common.SocialProvider;
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
@Entity
@Table(name = "socialAccount")
public class SocialAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private SocialProvider provider;  // SNS 제공자 (예: GOOGLE, FACEBOOK 등)

    private String providerId;  // SNS에서 제공하는 고유 ID
    private String accessToken;  // 선택적: 토큰이 필요한 경우

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

}
