package com.demo.MyApp.user.product.controller;

import com.demo.MyApp.admin.product.dto.ProductDto;
import com.demo.MyApp.admin.product.entity.Product;
import com.demo.MyApp.user.product.dto.UserProductDto;
import com.demo.MyApp.user.product.service.UserProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/product")
public class UserProductController {

    @Autowired
    private UserProductServiceImpl userProductService;

    @GetMapping("/userProductList")
    public Page<Product> userProductList(Model model
            , @RequestParam("page") int page
            , @RequestParam("size") int size) throws Exception{
        /* 사용자 > 상품리스트 */
        return userProductService.userProductList(page, size);
    }

    @GetMapping("/userProductDetail")
    public ProductDto userProductDetail(@ModelAttribute ProductDto productDto, @RequestParam("id") Long id) throws Exception{
        /* 사용자 > 상품상세 */
        return userProductService.userProductDetail(id);
    }

    @GetMapping("/favoriteProductList")
    public List<UserProductDto> favoriteProductList(Model model) throws Exception{
        /* 사용자 > 메인페이지 슬라이더 */
        List<UserProductDto> list = userProductService.favoriteProductList();
        model.addAllAttributes(list);
        return list;
    }

    @GetMapping("/lowerPriceProductList")
    public List<UserProductDto> lowerPriceProductList(Model model) throws Exception{
        /* 사용자 > 메인페이지 슬라이더 */
        List<UserProductDto> list = userProductService.lowerPriceProductList();
        model.addAllAttributes(list);
        return list;
    }

    @GetMapping("/higherViewsProductList")
    public List<UserProductDto> higherViewsProductList(Model model) throws Exception{
        /* 사용자 > 메인페이지 슬라이더 */
        List<UserProductDto> list = userProductService.higherViewsProductList();
        model.addAllAttributes(list);
        return list;
    }

    @GetMapping("/higherTotalSalesProductList")
    public List<UserProductDto> higherTotalSalesProductList(Model model) throws Exception{
        /* 사용자 > 메인페이지 슬라이더 */
        List<UserProductDto> list = userProductService.higherTotalSalesProductList();
        model.addAllAttributes(list);
        return list;
    }



}
