package com.demo.MyApp.common.dto;

import lombok.*;
import org.springframework.data.relational.core.mapping.Table;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@Table(name = "Users")
public class UserDto {
    private Long id;
    private String userId;
    private String pw; //nullable. social login 경우 -1
    private String userNm;
    private String phone;
    private String address;
    private String role;
    private String email;
    private String provider; //local, kakao..
    private Long providerId; //nullable

}
