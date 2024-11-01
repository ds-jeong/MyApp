package com.demo.MyApp.user.product.service;

import com.demo.MyApp.admin.order.repository.OrderDetailRepository;
import com.demo.MyApp.admin.product.dto.ProductDto;
import com.demo.MyApp.admin.product.entity.Product;
import com.demo.MyApp.user.product.dto.UserProductDto;
import com.demo.MyApp.user.product.repository.UserProductRepository;
import com.demo.MyApp.user.review.repository.ReviewRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor //생성자 주입코드없이 의존성주입
public class UserProductServiceImpl implements UserProductService {

    @Autowired
    private final UserProductRepository userProductRepository;

    @Autowired
    private final OrderDetailRepository orderDetailRepository;

    @Autowired
    private final ReviewRepository reviewRepository;

    @Override
    public Page<UserProductDto> userProductList(Pageable pageable) throws Exception {
        // 페이지 요청에 따라 상품 목록을 가져오기 위해 userProductRepository를 호출
        Page<Product> productPage = userProductRepository.findAll(pageable);

        // 판매수와 리뷰수를 가져오기 위한 리스트 생성
        List<UserProductDto> productDtoList = new ArrayList<>();
        for (Product product : productPage.getContent()) {
            // UserProductDto 객체 생성 및 필드 설정
            UserProductDto dto = new UserProductDto();
            dto.setId(product.getProductId()); // Product ID
            dto.setProductNm(product.getProductNm()); // 상품명
            dto.setPrice(product.getPrice()); // 가격
            dto.setAuthor(product.getAuthor()); // 저자
            dto.setContent(product.getContent()); // 내용
            dto.setFileNm(product.getFileNm()); // 파일 이름
            dto.setFilePath(product.getFilePath()); // 파일 경로

            // 판매수 가져오기
            Integer quantity = orderDetailRepository.sumQuantityByProductId(product.getProductId());
            if(quantity == null)
                quantity = 0;
            dto.setSalesCount(quantity); // DTO에 판매수 설정

            // 리뷰수 가져오기 (ReviewRepository를 통해)
            int reviewCount = reviewRepository.countByOrderDetail_Product_ProductId(product.getProductId()); // Review 엔티티에서 리뷰수 조회
            dto.setReviewCount(reviewCount); // DTO에 리뷰수 설정

            // DTO 리스트에 추가
            productDtoList.add(dto);
        }

//        // 가져온 상품 목록을 UserProductDto 리스트로 변환
//        List<UserProductDto> productDtoList = convertToDtoList(productPage.getContent());

        // 변환된 DTO 리스트와 페이지 정보를 포함하여 Page<UserProductDto> 객체 생성 후 반환
        return new PageImpl<>(productDtoList, pageable, productPage.getTotalElements());
    }

    // 주어진 Product 리스트를 UserProductDto 리스트로 변환하는 메서드
    private List<UserProductDto> convertToDtoList(List<Product> products) {
        // 각 Product 객체를 UserProductDto로 변환하여 리스트로 수집
        return products.stream()
                .map(this::convertToDto) // convertToDto 메서드를 사용하여 변환
                .collect(Collectors.toList()); // 변환된 결과를 리스트로 수집
    }

    // 단일 Product 객체를 UserProductDto로 변환하는 메서드
    private UserProductDto convertToDto(Product product) {
        // UserProductDto 객체를 빌더 패턴을 통해 생성 및 초기화
        return UserProductDto.builder()
                .id(product.getProductId()) // 제품 ID 설정
                .productNm(product.getProductNm()) // 제품 이름 설정
                .price(product.getPrice()) // 제품 가격 설정
                .content(product.getContent()) // 제품 설명 설정
                .author(product.getAuthor()) // 제품 저자 설정
                .fileNm(product.getFileNm()) // 파일 이름 설정
                .filePath(product.getFilePath()) // 파일 경로 설정
                .build(); // 최종적으로 UserProductDto 객체 반환
    }

//    @Override
//    public List<UserProductDto> userProductList() throws Exception {
//        List<Product> products = userProductRepository.findAll();
//
//        List<UserProductDto> productDtoList = new ArrayList<>();
//        for (Product product : products) {
//            UserProductDto productDto = UserProductDto.builder()
//                    .id(product.getProductId())
//                    .productNm(product.getProductNm())
//                    .price(product.getPrice())
//                    .content(product.getContent())
//                    .author(product.getAuthor())
//                    .fileNm(product.getFileNm())
//                    .filePath(product.getFilePath())
//                    .build();
//            productDtoList.add(productDto);
//        }
//
//        return productDtoList;
//    }

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

    public String getProductName(Long productId) throws Exception {
        return userProductRepository.findProductNmByProductId(productId);
    }

}
