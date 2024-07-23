package com.demo.MyApp.user.qna.service;

import com.demo.MyApp.user.qna.dto.QnaDto;
import org.springframework.web.multipart.MultipartFile;

public interface QnaService {
    void qnaRegist(QnaDto qnaDto, MultipartFile file) throws Exception;
}
