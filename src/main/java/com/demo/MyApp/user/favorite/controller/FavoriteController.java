package com.demo.MyApp.user.favorite.controller;

import com.demo.MyApp.user.favorite.dto.FavoriteDto;
import com.demo.MyApp.user.favorite.entity.Favorite;
import com.demo.MyApp.user.favorite.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user/like")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @PostMapping("/toggleLike")
    public void toggleLike(@RequestBody FavoriteDto favoriteDto) {
        favoriteService.toggleLike(favoriteDto.getUserId(), favoriteDto.getProductId());
    }

    @GetMapping("/likedProducts")
    public List<Long> likedProducts(@RequestParam(name = "userId") Long userId) {
        List<Long> productIdList = favoriteService.likedProducts(userId);

        if (productIdList.isEmpty()) {
            System.out.println("############No like found for userId: " + userId);
        }
        return favoriteService.likedProducts(userId);
    }

}
