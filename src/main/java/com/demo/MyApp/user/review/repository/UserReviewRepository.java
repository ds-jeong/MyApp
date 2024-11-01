package com.demo.MyApp.user.review.repository;

import com.demo.MyApp.user.review.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserReviewRepository extends JpaRepository<Review, Long> {
    int countByOrderDetail_Product_ProductId(Long productId);
}
