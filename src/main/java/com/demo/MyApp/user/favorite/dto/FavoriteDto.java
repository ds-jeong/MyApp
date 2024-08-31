package com.demo.MyApp.user.favorite.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class FavoriteDto {
    private Long productId;
    private Long userId;
}
