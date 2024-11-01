package com.demo.MyApp.user.review.repository;

import com.demo.MyApp.user.review.entity.Review;
import jakarta.persistence.Tuple;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserReviewRepository extends JpaRepository<Review, Long> {
    int countByOrderDetail_Product_ProductId(Long productId);

    @Query("SELECT o.orderId AS orderId" +
            ", o.orderNumber AS orderNumber" +
            ", DATE_FORMAT(o.orderDate, '%Y-%m-%d') AS orderDate" +
            ", o.state AS state" +
            ", od.orderDetailId AS orderDetailId" +
            ", od.quantity AS quantity" +
            ", p.productId AS productId" +
            ", p.price AS price" +
            ", p.filePath AS filePath" +
            ", p.productNm AS productNm " +
            ", r.reviewId AS reviewId " +
            ", r.title AS title " +
            ", r.content AS content " +
            ", r.rating AS rating " +
            ", r.fileNm AS reviewImgNm " +
            ", r.filePath AS reviewImgPath " +
            "FROM Order o " +
            "JOIN o.orderDetails od " + // Order와 OrderDetail 사이의 조인 조건
            "JOIN od.product p " + // OrderDetail과 Product 사이의 조인 조건
            "JOIN Review r ON od.orderDetailId = r.orderDetail.orderDetailId " + // Review와 Product 사이의 조인 조건
            "WHERE o.user.id = :userId")
    List<Tuple> findReviewsByUserId(@Param("userId") Long userId);

    @Query("SELECT r.reviewId AS reviewId " +
            ", r.title AS title " +
            ", r.content AS content " +
            ", r.rating AS rating " +
            ", r.fileNm AS reviewImgNm " +
            ", r.filePath AS reviewImgPath " +
            ", DATE_FORMAT(r.createdAt, '%Y-%m-%d') AS createdAt " +
            "FROM Review r WHERE r.product.productId = :productId")
    List<Tuple> findReviewsByProductId(@Param("productId") Long productId);
}
