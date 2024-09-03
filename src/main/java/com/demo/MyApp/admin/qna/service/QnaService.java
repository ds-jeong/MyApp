package com.demo.MyApp.admin.qna.service;

import com.demo.MyApp.admin.qna.dto.QnaDto;
import com.demo.MyApp.admin.qna.entity.Qna;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

public interface QnaService {
    void insertQna(QnaDto qnaDto, MultipartFile file) throws Exception;

    Page<Qna> qnaList(int page, int size) throws Exception;

    void addQnaViews(Long id) throws Exception;

    QnaDto qnaDetail(Long id) throws Exception;

    void updateQna(QnaDto qnaDto, Long id, MultipartFile file, String originFilePath) throws Exception;

    void deleteQna(Long id) throws Exception;

}
