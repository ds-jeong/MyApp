package com.demo.MyApp.user.product.service;

import com.demo.MyApp.admin.product.dto.ProductDto;
import com.demo.MyApp.user.product.dto.UserProductDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserProductService {

    Page<UserProductDto> userProductList(Pageable pageable) throws Exception;
//    List<UserProductDto> userProductList() throws Exception;

    ProductDto userProductDetail(Long id) throws Exception;

    List<UserProductDto> favoriteProductList() throws Exception;

    String getProductName(Long productId) throws Exception;

}