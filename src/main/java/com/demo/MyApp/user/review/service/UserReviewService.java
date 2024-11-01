package com.demo.MyApp.user.review.service;

import com.demo.MyApp.user.review.dto.UserReviewDto;
import org.springframework.web.multipart.MultipartFile;

public interface UserReviewService {
    void insertReview(UserReviewDto userReviewDto, MultipartFile file) throws Exception;
}
