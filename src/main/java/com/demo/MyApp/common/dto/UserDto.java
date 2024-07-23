package com.demo.MyApp.common.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class UserDto {
    private Long id;
    private String userId;
    private String pw;
    private String userNm;
    private String phone;
    private String address;
    private String role;
    private String email;

}
