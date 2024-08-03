package com.demo.MyApp.user.product.service;

import com.demo.MyApp.user.product.dto.UserProductDto;

import java.util.List;

public interface UserProductService {
    List<UserProductDto> favoriteProductList() throws Exception;
}
