package com.demo.MyApp.user.myPage.service;

import com.demo.MyApp.admin.order.entity.OrderDetail;
import com.demo.MyApp.admin.product.entity.Product;
import com.demo.MyApp.config.aws.s3.S3Uploader;
import com.demo.MyApp.user.order.repository.UserOrderDetailRepository;
import com.demo.MyApp.user.review.dto.UserReviewDto;
import com.demo.MyApp.user.review.entity.Review;
import com.demo.MyApp.user.review.repository.UserReviewRepository;
import jakarta.persistence.Tuple;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MyPageServiceImpl implements MyPageService {

    @Autowired
    private UserOrderDetailRepository userOrderDetailRepository;

    @Autowired
    private S3Uploader s3Uploader;

    @Autowired
    private UserReviewRepository userReviewRepository;

    @Override
    public List<Map<String, Object>> orderHistory(Long id) throws Exception {

        /* 주문정보 */
        List<Tuple> orders = userOrderDetailRepository.findOrderDetailsByUserId(id);
        List<Map<String, Object>> orderHistoryList = new ArrayList<>();

        /* 주문정보를 map에 매핑 */
        for (Tuple order : orders) {
            Map<String, Object> orderDetailMap = new HashMap<>();
            orderDetailMap.put("orderId", order.get("orderId"));
            orderDetailMap.put("orderNumber", order.get("orderNumber"));
            orderDetailMap.put("orderDate", order.get("orderDate"));
            orderDetailMap.put("orderDetailId", order.get("orderDetailId"));
            orderDetailMap.put("state", order.get("state"));
            orderDetailMap.put("quantity", order.get("quantity"));
            orderDetailMap.put("productId", order.get("productId"));
            orderDetailMap.put("price", order.get("price"));
            orderDetailMap.put("filePath", order.get("filePath"));
            orderDetailMap.put("productNm", order.get("productNm"));

            orderHistoryList.add(orderDetailMap);
        }

        return orderHistoryList;
    }

    @Transactional
    @Override
    public void insertReview(UserReviewDto userReviewDto, MultipartFile file) throws Exception {
        /* 파일이 저장될 이미지 경로 */
        String uploadImageUrl = "";

        /* 파일 null 처리 */
        if (file != null && !file.isEmpty()) {
            /* 이미지 업로드 공통 메소드 */
            uploadImageUrl = s3Uploader.uploadFiles(file, "product/image");
            /* 값셋팅 */
            userReviewDto.setFileNm(file.getOriginalFilename());
            userReviewDto.setFilePath(uploadImageUrl);
        }

        /* 주문상세정보 */
        OrderDetail orderDetail = userOrderDetailRepository.findById(userReviewDto.getOrderDetailId())
                .orElseThrow(() -> new RuntimeException("orderDetailId not found"));;

        /* 상품정보 */
        Product product = orderDetail.getProduct();

        /* DTO를 Entity로 변환하여 save() 메소드에 담아 데이터 삽입 */
        Review review = Review.toEntity(userReviewDto);
        review.setFileNm(file.getOriginalFilename());
        review.setFilePath(uploadImageUrl);
        review.setRating(userReviewDto.getRating());
        review.setTitle(userReviewDto.getTitle());
        review.setContent(userReviewDto.getContent());
        review.setCreatedAt(userReviewDto.getCreatedAt());
        review.setUpdatedAt(userReviewDto.getUpdatedAt());
        review.setOrderDetail(orderDetail);
        review.setProduct(product);

        userReviewRepository.save(review);

    }

    @Override
    public List<Map<String, Object>> myReviewsList(Long id) throws Exception {

        /* 내가 쓴 리뷰 정보 */
        List<Tuple> orders = userReviewRepository.findReviewsByUserId(id);

        List<Map<String, Object>> reviewList = new ArrayList<>();

        /* 리뷰정보를 map에 매핑 */
        for (Tuple order : orders) {
            Map<String, Object> reviewDetailMap = new HashMap<>();
            reviewDetailMap.put("orderId", order.get("orderId"));
            reviewDetailMap.put("orderNumber", order.get("orderNumber"));
            reviewDetailMap.put("orderDate", order.get("orderDate"));
            reviewDetailMap.put("orderDetailId", order.get("orderDetailId"));
            reviewDetailMap.put("state", order.get("state"));
            reviewDetailMap.put("quantity", order.get("quantity"));
            reviewDetailMap.put("productId", order.get("productId"));
            reviewDetailMap.put("price", order.get("price"));
            reviewDetailMap.put("filePath", order.get("filePath"));
            reviewDetailMap.put("productNm", order.get("productNm"));
            reviewDetailMap.put("reviewId", order.get("reviewId"));
            reviewDetailMap.put("title", order.get("title"));
            reviewDetailMap.put("content", order.get("content"));
            reviewDetailMap.put("rating", order.get("rating"));
            reviewDetailMap.put("reviewImgNm", order.get("reviewImgNm"));
            reviewDetailMap.put("reviewImgPath", order.get("reviewImgPath"));

            reviewList.add(reviewDetailMap);
        }


        return reviewList;
    }
}
