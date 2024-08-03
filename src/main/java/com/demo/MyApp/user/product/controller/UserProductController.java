package com.demo.MyApp.user.product.controller;

import com.demo.MyApp.user.product.dto.UserProductDto;
import com.demo.MyApp.user.product.service.UserProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user/product")
public class UserProductController {

    @Autowired
    private UserProductServiceImpl productService;

    @GetMapping("/favoriteProductList")
    public List<UserProductDto> favoriteProductList(Model model) throws Exception{
        //사용자 > 메인페이지 슬라이더
        List<UserProductDto> list = productService.favoriteProductList();
        model.addAllAttributes(list);
        return list;
    }

}
