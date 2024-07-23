package com.demo.MyApp.admin.product.Service;

import com.demo.MyApp.admin.product.Dto.ProductDto;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {

    void insertProduct(ProductDto productDto, MultipartFile file) throws Exception;

    List<ProductDto> productList(Model model) throws Exception;

    ProductDto productDetail(Long id) throws Exception;

    void updateProduct(ProductDto productDto, Long id, MultipartFile file) throws Exception;

    void deleteProduct(Long id) throws Exception;
}
