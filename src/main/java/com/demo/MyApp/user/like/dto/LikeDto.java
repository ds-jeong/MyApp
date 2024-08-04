package com.demo.MyApp.user.like.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class LikeDto {
    private Long productId;
    private Long userId;
}
