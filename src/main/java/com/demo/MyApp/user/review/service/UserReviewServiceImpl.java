package com.demo.MyApp.user.review.service;

import com.demo.MyApp.admin.order.entity.OrderDetail;
import com.demo.MyApp.admin.order.repository.OrderDetailRepository;
import com.demo.MyApp.admin.product.entity.Product;
import com.demo.MyApp.config.aws.s3.S3Uploader;
import com.demo.MyApp.user.review.dto.UserReviewDto;
import com.demo.MyApp.user.review.entity.Review;
import com.demo.MyApp.user.review.repository.UserReviewRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UserReviewServiceImpl implements UserReviewService {

    @Autowired
    private S3Uploader s3Uploader;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private UserReviewRepository userReviewRepository;

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
        OrderDetail orderDetail = orderDetailRepository.findById(userReviewDto.getOrderDetailId())
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
}
