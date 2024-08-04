package com.demo.MyApp.user.like.controller;

import com.demo.MyApp.user.like.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user/like")
public class LikeController {

    @Autowired
    private LikeService likeService;

    @PostMapping("/toggleLike")
    public void toggleLike(@RequestParam Long userId, @RequestParam Long productId) {
        likeService.toggleLike(userId, productId);
    }
}
