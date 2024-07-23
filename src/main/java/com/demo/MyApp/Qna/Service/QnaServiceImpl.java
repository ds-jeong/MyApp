package com.demo.MyApp.Qna.Service;

import com.demo.MyApp.Common.utill.service.UtillServiceImpl;
import com.demo.MyApp.Qna.Entity.Qna;
import com.demo.MyApp.Qna.Repository.QnaRepository;
import com.demo.MyApp.Qna.Dto.QnaDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor //생성자 주입코드없이 의존성주입
public class QnaServiceImpl implements QnaService{

    @Autowired
    private final QnaRepository qnaRepository;

    @Autowired
    private UtillServiceImpl utillService;

    @Override
    public void qnaRegist(QnaDto qnaDto, MultipartFile file) throws Exception {

        // 파일이 저장될 이미지 경로
        String UPLOAD_DIR = "C:\\file\\upload\\img\\";

        // 파일 null 처리
        if (file != null && !file.isEmpty()) {
            // 이미지 업로드 공통 메소드
            utillService.imgUpload(file);
            // 값셋팅
            qnaDto.setFileNm(file.getOriginalFilename());
            qnaDto.setFilePath(UPLOAD_DIR + file.getOriginalFilename());
        }

        // DTO를 Entity로 변환하여 save() 메소드에 담아 데이터 삽입
        Qna entity = Qna.toEntity(qnaDto);
        qnaRepository.save(entity);
    }
}
