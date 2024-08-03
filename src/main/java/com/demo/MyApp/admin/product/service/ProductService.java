package com.demo.MyApp.admin.product.service;

import com.demo.MyApp.admin.product.dto.ProductDto;
import com.demo.MyApp.admin.product.entity.Product;
import com.demo.MyApp.user.qna.entity.Qna;
import org.springframework.data.domain.Page;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {
    void insertProduct(ProductDto productDto, MultipartFile file) throws Exception;

    Page<Product> productList(int page, int size) throws Exception;

    ProductDto productDetail(Long id) throws Exception;

    void updateProduct(ProductDto productDto, Long id, MultipartFile file) throws Exception;

    void deleteProduct(Long id) throws Exception;
}
