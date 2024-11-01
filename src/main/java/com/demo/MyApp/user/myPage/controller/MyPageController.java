package com.demo.MyApp.user.myPage.controller;

import com.demo.MyApp.user.myPage.service.MyPageService;
import com.demo.MyApp.user.review.dto.UserReviewDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user/mypage")
public class MyPageController {

    @Autowired
    private MyPageService myPageService;

    @PostMapping("/orderHistory")
    public List<Map<String, Object>> orderHistory(@RequestParam("id") Long id) throws Exception{
        /* 사용자 > 마이페이지 > 주문내역 */
        return myPageService.orderHistory(id);
    }

    @PostMapping("/review/insertReview")
    public void insertReview(@ModelAttribute UserReviewDto userReviewDto, @RequestParam("file") MultipartFile file) throws Exception{
        /* 사용자 > 마이페이지 > 주문내역 > 리뷰작성 */
        myPageService.insertReview(userReviewDto, file);
    }

    @PostMapping("/review/myReviewsList")
    public List<Map<String, Object>> myReviewsList(@RequestParam("id") Long id) throws Exception{
        /* 사용자 > 마이페이지 > 내가 쓴 리뷰 */
        return myPageService.myReviewsList(id);
    }
}
