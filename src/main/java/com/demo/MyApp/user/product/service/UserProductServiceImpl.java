package com.demo.MyApp.user.product.service;

import com.demo.MyApp.admin.product.dto.ProductDto;
import com.demo.MyApp.admin.product.entity.Product;
import com.demo.MyApp.user.product.dto.UserProductDto;
import com.demo.MyApp.user.product.repository.UserProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor //생성자 주입코드없이 의존성주입
public class UserProductServiceImpl implements UserProductService {

    @Autowired
    private final UserProductRepository userProductRepository;

    @Override
    public Page<Product> userProductList(int page, int size) throws Exception {
        return userProductRepository.findAll(PageRequest.of(page, size));
    }

    @Transactional
    @Override
    public ProductDto userProductDetail(Long id) throws Exception {
        Optional<Product> product = userProductRepository.findById(id);
        ProductDto productDto = ProductDto.builder()
                .productId(product.get().getProductId())
                .productNm(product.get().getProductNm())
                .price(product.get().getPrice())
                .shipping(product.get().getShipping())
                .content(product.get().getContent())
                .author(product.get().getAuthor())
                .fileNm(product.get().getFileNm())
                .filePath(product.get().getFilePath())
                .build();

        return productDto;
    }

    @Transactional
    @Override
    public List<UserProductDto> favoriteProductList() throws Exception {
        List<Product> products = userProductRepository.findAllByOrderByFavoriteDesc();
        List<UserProductDto> productDtoList = new ArrayList<>();
        for (Product product : products) {
            UserProductDto productDto = UserProductDto.builder()
                    .id(product.getProductId())
                    .productNm(product.getProductNm())
                    .price(product.getPrice())
                    .content(product.getContent())
                    .author(product.getAuthor())
                    .fileNm(product.getFileNm())
                    .filePath(product.getFilePath())
                    .build();
            productDtoList.add(productDto);
        }

        return productDtoList;
    }

}
