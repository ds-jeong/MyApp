package com.demo.MyApp.Qna.Service;

import com.demo.MyApp.Qna.Dto.QnaDto;
import org.springframework.web.multipart.MultipartFile;

public interface QnaService {
    void qnaRegist(QnaDto qnaDto, MultipartFile file) throws Exception;
}
