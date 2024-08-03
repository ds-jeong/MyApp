package com.demo.MyApp.user.product.service;

import com.demo.MyApp.admin.product.dto.ProductDto;
import com.demo.MyApp.admin.product.entity.Product;
import com.demo.MyApp.user.product.dto.UserProductDto;
import com.demo.MyApp.user.product.repository.UserProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor //생성자 주입코드없이 의존성주입
public class UserProductServiceImpl implements UserProductService {

    @Autowired
    private final UserProductRepository userProductRepository;

    @Transactional
    @Override
    public List<UserProductDto> favoriteProductList() throws Exception {
        List<Product> products = userProductRepository.findAllByOrderByFavoriteDesc();
        List<UserProductDto> productDtoList = new ArrayList<>();
        for (Product product : products) {
            UserProductDto productDto = UserProductDto.builder()
                    .id(product.getId())
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
