package com.demo.MyApp.admin.qna.controller;

import com.demo.MyApp.admin.qna.dto.QnaDto;
import com.demo.MyApp.admin.qna.entity.Qna;
import com.demo.MyApp.admin.qna.service.QnaServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/admin/qna")
public class QnaController {

    @Autowired
    private QnaServiceImpl qnaService;

    @PostMapping("/insertQna")
    public String insertQna(@ModelAttribute QnaDto qnaDto, @RequestParam("file") MultipartFile file) throws Exception{
        /* 사용자 > Q&A 등록 */
        qnaService.insertQna(qnaDto, file);
        return "Post received successfully";
    }

    @GetMapping("/qnaList")
    public Page<Qna> qnaList(Model model
                             , @RequestParam("page") int page
                             , @RequestParam("size") int size) throws Exception{
        /* 사용자 > Q&A 리스트 */
        return qnaService.qnaList(page, size);
    }

    @GetMapping("/addQnaViews")
    public String addQnaViews(@RequestParam("id") Long id) throws Exception{
        /* 사용자 > Q&A 조회수 증가 */
        qnaService.addQnaViews(id);
        return "Post received successfully";
    }

    @GetMapping("/qnaDetail")
    public QnaDto qnaDetail(@ModelAttribute QnaDto qnaDto, @RequestParam("id") Long id) throws Exception{
        /* 사용자 > Q&A 상세 */
        return qnaService.qnaDetail(id);
    }

    @GetMapping("/qnaModify")
    public QnaDto qnaModify(@ModelAttribute QnaDto qnaDto, @RequestParam("id") Long id) throws Exception{
        /* 관리자 > Q&A 수정 */
        return qnaService.qnaDetail(id);
    }

    @PostMapping("/updateQna")
    public String updateQna(@ModelAttribute QnaDto qnaDto,@RequestParam("id") Long id, @RequestParam("file") MultipartFile file, @RequestParam("originFilePath") String originFilePath) throws Exception{
        /* 관리자 > Q&A 변경 */
        qnaService.updateQna(qnaDto, id, file, originFilePath);
        return "Post received successfully";
    }

    @GetMapping("/deleteQna")
    public String deleteQna(@ModelAttribute QnaDto qnaDto, @RequestParam("id") Long id) throws Exception{
        /* 관리자 > Q&A 삭제 */
        qnaService.deleteQna(id);
        return "Post received successfully";
    }

}
