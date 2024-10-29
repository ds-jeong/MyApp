package com.demo.MyApp.admin.product.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class ProductUploadDto {
    private Long productId;
    private String category;
    private String productNm;
    private int price;
    private int shipping;
    private String content;
    private String author;
    private MultipartFile file;
    private  String fileNm;
    private  String filePath;
}
