package com.demo.MyApp.user.review.dto;

import com.demo.MyApp.user.order.dto.UserOrderDetailDto;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class UserReviewDto {
    private Long reviewId;
    private String title;
    private String content;
    private MultipartFile file;
    private  String fileNm;
    private  String filePath;
    private int views;
    private int favorite;
    private byte rating;
    private Long productId;
    private Long orderDetailId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<UserOrderDetailDto> orderDetails;
}
