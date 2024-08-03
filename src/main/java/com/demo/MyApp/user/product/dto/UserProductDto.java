package com.demo.MyApp.user.product.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class UserProductDto {
    private Long id;
    private String productNm;
    private double price;
    private String author;
    private String content;
    private MultipartFile file;
    private  String fileNm;
    private  String filePath;
    private  String productKind;

}
