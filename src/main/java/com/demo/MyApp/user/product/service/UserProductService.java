package com.demo.MyApp.user.product.service;

import com.demo.MyApp.admin.product.dto.ProductDto;
import com.demo.MyApp.admin.product.entity.Product;
import com.demo.MyApp.user.product.dto.UserProductDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface UserProductService {

    Page<Product> userProductList(int page, int size) throws Exception;

    ProductDto userProductDetail(Long id) throws Exception;

    List<UserProductDto> favoriteProductList() throws Exception;

    List<UserProductDto> lowerPriceProductList() throws Exception;

    List<UserProductDto> higherViewsProductList() throws Exception;

    List<UserProductDto> higherTotalSalesProductList() throws Exception;

}