package com.demo.MyApp.user.qna.service;

import com.demo.MyApp.user.qna.dto.QnaDto;
import com.demo.MyApp.user.qna.entity.Qna;
import org.springframework.data.domain.Page;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface QnaService {
    void insertQna(QnaDto qnaDto, MultipartFile file) throws Exception;

    Page<Qna> qnaList(int page, int size) throws Exception;

    void addQnaViews(Long id) throws Exception;

    QnaDto qnaDetail(Long id) throws Exception;

    void updateQna(QnaDto qnaDto, Long id, MultipartFile file) throws Exception;

    void deleteQna(Long id) throws Exception;

}
