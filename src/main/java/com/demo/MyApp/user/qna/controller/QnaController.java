package com.demo.MyApp.user.qna.controller;

import com.demo.MyApp.user.qna.service.QnaServiceImpl;
import com.demo.MyApp.user.qna.dto.QnaDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/qna")
public class QnaController {

    @Autowired
    private QnaServiceImpl qnaService;

    @PostMapping("/qnaRegist")
    public String qnaRegist(@ModelAttribute QnaDto qnaDto, @RequestParam("file") MultipartFile file) throws Exception{
        qnaService.qnaRegist(qnaDto, file);
        return "Post received successfully";
    }

}
