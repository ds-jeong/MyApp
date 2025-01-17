package com.demo.MyApp.user.myPage.controller;

import com.demo.MyApp.admin.order.entity.OrderStatus;
import com.demo.MyApp.admin.order.repository.OrderRepository;
import com.demo.MyApp.user.myPage.service.MyPageService;
import com.demo.MyApp.user.order.dto.OrderCancelDto;
import com.demo.MyApp.user.order.repository.UserOrderRepository;
import com.demo.MyApp.user.returnRequst.dto.UserReturnRequestDto;
import com.demo.MyApp.user.review.dto.UserReviewDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user/mypage")
public class MyPageController {

    @Autowired
    private MyPageService myPageService;

    @Autowired
    private UserOrderRepository userorderRepository;

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

    @PostMapping("/returnRequst/insertReturnRequst")
    public void insertReturnRequst(@ModelAttribute UserReturnRequestDto returnRequestDto) throws Exception{
        /* 사용자 > 마이페이지 > 주문내역 > 반품 */
        myPageService.insertReturnRequst(returnRequestDto);
    }

    @PostMapping("/orderCancel")
    public ResponseEntity<String> orderCancel(@ModelAttribute OrderCancelDto orderCancelDto) throws Exception{
        myPageService.updateOrderStatus(orderCancelDto, OrderStatus.PAYMENT_CANCELLED);
        return ResponseEntity.ok("order canceled successfully");
    }

}
