package com.demo.MyApp.user.myPage.service;

import com.demo.MyApp.admin.order.entity.Order;
import com.demo.MyApp.admin.order.entity.OrderDetail;
import com.demo.MyApp.admin.order.entity.OrderStatus;
import com.demo.MyApp.admin.order.entity.OrderStatusHist;
import com.demo.MyApp.admin.product.entity.Product;
import com.demo.MyApp.admin.returnRequest.entity.ReturnRequest;
import com.demo.MyApp.common.entity.User;
import com.demo.MyApp.config.aws.s3.S3Uploader;
import com.demo.MyApp.user.order.repository.UserOrderDetailRepository;
import com.demo.MyApp.user.order.repository.UserOrderStatusHistRepository;
import com.demo.MyApp.user.returnRequst.dto.UserReturnRequestDto;
import com.demo.MyApp.user.returnRequst.repository.UserReturnRequestRepository;
import com.demo.MyApp.user.review.dto.UserReviewDto;
import com.demo.MyApp.user.review.entity.Review;
import com.demo.MyApp.user.review.repository.UserReviewRepository;
import jakarta.persistence.Tuple;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
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

    @Autowired
    private UserReturnRequestRepository userReturnRequestRepository;

    @Autowired
    private UserOrderStatusHistRepository userOrderStatusHistRepository;

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
            orderDetailMap.put("returnReqStatus", order.get("returnReqStatus"));

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

    @Transactional
    @Override
    public void insertReturnRequst(UserReturnRequestDto userReturnRequestDto) throws Exception {

        /* 주문상세정보 */
        OrderDetail orderDetail = userOrderDetailRepository.findById(userReturnRequestDto.getOrderDetailId())
                .orElseThrow(() -> new RuntimeException("orderDetailId not found"));;

        /* 주문정보 */
        Order order = orderDetail.getOrder();

        /* 유저정보 */
        User user = order.getUser();

        /* 반품정보 저장 */
        /* DTO를 Entity로 변환하여 save() 메소드에 담아 데이터 삽입 */
        ReturnRequest returnRequest = ReturnRequest.toEntity(userReturnRequestDto);
        returnRequest.setStatus(OrderStatus.RETURN_REQUESTED); /* 반품접수 */
        returnRequest.setReason(userReturnRequestDto.getReason());
        returnRequest.setCreatedAt(userReturnRequestDto.getCreatedAt());
        returnRequest.setUpdatedAt(userReturnRequestDto.getUpdatedAt());
        returnRequest.setOrderDetail(orderDetail);
        returnRequest.setOrder(order);
        returnRequest.setUser(user);


        userReturnRequestRepository.save(returnRequest);

        /* 주문상태 업데이트 주문테이블 상태값 수정 (추후 진행예정)
         상태 로직 > 결제, 결제취소 - 주문,주문취소 - 발송 - 배송중 - 배송완료, 반품접수 - 반품발송 - 반품완료 */


        /* 이력 저장 */
        OrderStatusHist orderStatusHist = new OrderStatusHist();
        orderStatusHist.setOrderDetail(orderDetail);
        orderStatusHist.setStatus(OrderStatus.RETURN_REQUESTED); /* 반품접수 */
        orderStatusHist.setCreatedAt(LocalDateTime.now());
        orderStatusHist.setUpdatedAt(LocalDateTime.now());
        orderStatusHist.setUser(user);

        userOrderStatusHistRepository.save(orderStatusHist);

    }
}
