package com.demo.MyApp.admin.product.service;

import com.demo.MyApp.admin.product.dto.ProductDto;
import com.demo.MyApp.admin.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

public interface ProductService {
    void insertProduct(ProductDto productDto, MultipartFile file) throws Exception;

    Page<Product> productList(int page, int size) throws Exception;

    ProductDto productDetail(Long id) throws Exception;

    void updateProduct(ProductDto productDto, Long id, MultipartFile file, String originFilePath) throws Exception;

    void deleteProduct(Long id) throws Exception;
}
