package com.demo.MyApp.user.favorite.service;

import com.demo.MyApp.user.favorite.entity.Favorite;

import java.util.List;
import java.util.Optional;

public interface FavoriteService {

    void toggleLike(Long userId, Long productId);

    List<Long> likedProducts(Long userId);
}
