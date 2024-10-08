package com.demo.MyApp.admin.qna.service;

import com.demo.MyApp.admin.qna.dto.QnaDto;
import com.demo.MyApp.admin.qna.entity.Qna;
import com.demo.MyApp.admin.qna.repository.QnaRepository;
import com.demo.MyApp.config.aws.s3.S3Uploader;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
@RequiredArgsConstructor /* 생성자 주입코드없이 의존성주입 */
public class QnaServiceImpl implements QnaService{

    @Autowired
    private final QnaRepository qnaRepository;

    @Autowired
    private S3Uploader s3Uploader;

    @Transactional
    @Override
    public void insertQna(QnaDto qnaDto, MultipartFile file) throws Exception {
        /* 파일이 저장될 이미지 경로 */
        String uploadImageUrl = "";

        /* 파일 null 처리 */
        if (file != null && !file.isEmpty()) {
            /* 이미지 업로드 공통 메소드 */
            uploadImageUrl = s3Uploader.uploadFiles(file, "qna/image");
            /* 값셋팅 */
            qnaDto.setFileNm(file.getOriginalFilename());
            qnaDto.setFilePath(uploadImageUrl);
        }

        /* DTO를 Entity로 변환하여 save() 메소드에 담아 데이터 삽입 */
        Qna entity = Qna.toEntity(qnaDto);
        qnaRepository.save(entity);
    }

    @Transactional
    @Override
    public Page<Qna> qnaList(int page, int size) throws Exception {
        return qnaRepository.findAll(PageRequest.of(page, size));
    }

    @Override
    public void addQnaViews(Long id) throws Exception {
        Qna qna = qnaRepository.findById(id).orElseThrow(()-> new EntityNotFoundException("Qna Not Found"));
        Integer currentViews = qna.getViews();
        //현재 조회수가 null 값인지 체크하는 로직
        if(currentViews==null){
            currentViews=0;
        }
        qna.setViews(currentViews + 1);
        qnaRepository.save(qna);
    }

    @Transactional
    @Override
    public QnaDto qnaDetail(Long id) throws Exception {
        Optional<Qna> qnaList = qnaRepository.findById(id);
        QnaDto qnaDto = QnaDto.builder()
                .id(qnaList.get().getId())
                .title(qnaList.get().getTitle())
                .content(qnaList.get().getContent())
                .author(qnaList.get().getAuthor())
                .fileNm(qnaList.get().getFileNm())
                .filePath(qnaList.get().getFilePath())
                .build();

        return qnaDto;
    }

    @Transactional
    @Override
    public void updateQna(QnaDto qnaDto, Long id, MultipartFile file, String originFilePath) throws Exception {
        Qna qna = qnaRepository.findById(id).orElseThrow();

        /* 파일이 저장될 이미지 경로 */
        String uploadImageUrl = "";

        /* 파일 null 처리 */
        if (file != null && !file.isEmpty()) {
            if (originFilePath != null && !originFilePath.isEmpty()) {
                s3Uploader.deleteImage(originFilePath);
            }
            /* 이미지 업로드 공통 메소드 */
            uploadImageUrl = s3Uploader.uploadFiles(file, "product/image");
            /* 값셋팅 */
            qna.setFileNm(file.getOriginalFilename());
            qna.setFilePath(uploadImageUrl);
        }
        /* DTO를 통해 필드를 업데이트 (값이 null이 아닐 때만) */
        if (qnaDto.getTitle() != null) {
            qna.setTitle(qnaDto.getTitle());
        }
        if (qnaDto.getContent() != null) {
            qna.setContent(qnaDto.getContent());
        }
        if (qnaDto.getAuthor() != null) {
            qna.setAuthor(qnaDto.getAuthor());
        }
        if (qnaDto.getFileNm() != null) {
            qna.setAuthor(qnaDto.getFileNm());
        }
        if (qnaDto.getFilePath() != null) {
            qna.setAuthor(qnaDto.getFilePath());
        }

        qnaRepository.save(qna);

    }

    @Transactional
    @Override
    public void deleteQna(Long id) throws Exception {
        qnaRepository.deleteById(id);
    }
}
