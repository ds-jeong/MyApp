package com.demo.MyApp.user.review.controller;

import com.demo.MyApp.user.review.dto.UserReviewDto;
import com.demo.MyApp.user.review.service.UserReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/user/review")
public class UserReviewController {

    @Autowired
    UserReviewService reviewService;

    @PostMapping("/insertReview")
    public void insertReview(@ModelAttribute UserReviewDto userReviewDto, @RequestParam("file") MultipartFile file) throws Exception{
        /* 사용자 > 주문내역 > 리뷰작성 */
        reviewService.insertReview(userReviewDto, file);
    }
}
