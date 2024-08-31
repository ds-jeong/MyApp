package com.demo.MyApp.admin.qna.dto;

import com.demo.MyApp.admin.qna.entity.Qna;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class QnaDto {
    private Long id;
    private String title;
    private String content;
    private String author;
    private MultipartFile file;
    private  String fileNm;
    private  String filePath;

    // Entity는 암묵적으로 Setter를 사용하지않음
    // Setter 대신 데이터를 가공할때 호출할 메소드
    public static QnaDto toDTO(Qna entity) {
        return QnaDto.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .content(entity.getContent())
                .author(entity.getAuthor())
                .fileNm(entity.getFileNm())
                .filePath(entity.getFilePath())
                .build();
    }

}
