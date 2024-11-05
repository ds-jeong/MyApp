package com.demo.MyApp.user.myPage.service;

import com.demo.MyApp.user.returnRequst.dto.UserReturnRequestDto;
import com.demo.MyApp.user.review.dto.UserReviewDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface MyPageService {
    List<Map<String, Object>> orderHistory(Long id) throws Exception;

    void insertReview(UserReviewDto userReviewDto, MultipartFile file) throws Exception;

    List<Map<String, Object>> myReviewsList(Long id) throws Exception;

    void insertReturnRequst(UserReturnRequestDto returnRequestDto) throws Exception;
}
