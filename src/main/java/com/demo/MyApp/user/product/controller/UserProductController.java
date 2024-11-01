package com.demo.MyApp.user.product.controller;

import com.demo.MyApp.admin.product.dto.ProductDto;
import com.demo.MyApp.user.product.dto.UserProductDto;
import com.demo.MyApp.user.product.service.UserProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user/product")
public class UserProductController {

    @Autowired
    private UserProductServiceImpl userProductService;

    @GetMapping("/userProductList")
    public Page<UserProductDto> userProductList(Model model
            , @RequestParam("page") int page
            , @RequestParam("size") int size) throws Exception{
        Pageable pageable = PageRequest.of(page, size);
        /* 사용자 > 상품리스트 */
        return userProductService.userProductList(pageable);
    }
//    @PostMapping("/userProductList")
//    public List<UserProductDto> userProductList() throws Exception{
//        /* 사용자 > 상품리스트 */
//        return userProductService.userProductList();
//    }

    @GetMapping("/userProductDetail")
    public ProductDto userProductDetail(@ModelAttribute ProductDto productDto, @RequestParam("id") Long id) throws Exception{
        /* 사용자 > 상품상세 */
        return userProductService.userProductDetail(id);
    }

//    @GetMapping("/favoriteProductList")
//    public List<UserProductDto> favoriteProductList(Model model) throws Exception{
//        /* 사용자 > 메인페이지 슬라이더 */
//        List<UserProductDto> list = userProductService.favoriteProductList();
//        model.addAllAttributes(list);
//        return list;
//    }
    @GetMapping("/favoriteProductList")
    public List<UserProductDto> favoriteProductList() throws Exception {
        // 사용자 > 메인페이지 슬라이더
        return userProductService.favoriteProductList();
    }


    @PostMapping("/review/reviewsList")
    public List<Map<String, Object>> reviewsList(@RequestParam("productId") Long productId) throws Exception{
        /* 사용자 > 상품상세 > 리뷰 */
        return userProductService.reviewsList(productId);
    }

}
