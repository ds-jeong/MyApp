package com.demo.MyApp.user.myPage.controller;

import com.demo.MyApp.user.myPage.service.MyPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
}
