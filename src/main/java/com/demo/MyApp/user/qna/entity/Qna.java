package com.demo.MyApp.user.qna.entity;

import com.demo.MyApp.user.qna.dto.QnaDto;
import jakarta.persistence.*;
import lombok.*;

@ToString
@Getter
@Setter
@Builder
@AllArgsConstructor //전체 필드에 대한 생성자를 생성하여 @builder사용이 가능하도록..
@NoArgsConstructor //기본 생성자를 생성
@Entity //선언
@Table(name = "qna")
public class Qna {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private  String author;

    @Column
    private  String title;

    @Column
    private  String content;

    @Column
    private  String fileNm;

    @Column
    private  String filePath;

    // Entity는 암묵적으로 Setter를 사용하지않음
    // Setter 대신 데이터를 가공할때 호출할 메소드
    public static Qna toEntity(QnaDto dto) {
        return Qna.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .content(dto.getContent())
                .author(dto.getAuthor())
                .fileNm(dto.getFileNm())
                .filePath(dto.getFilePath())
                .build();
    }
}
