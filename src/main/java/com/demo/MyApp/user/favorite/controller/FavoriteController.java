package com.demo.MyApp.user.favorite.controller;

import com.demo.MyApp.user.favorite.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user/like")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @PostMapping("/toggleLike")
    public void toggleLike(@RequestParam Long userId, @RequestParam Long productId) {
        favoriteService.toggleLike(userId, productId);
    }
}
