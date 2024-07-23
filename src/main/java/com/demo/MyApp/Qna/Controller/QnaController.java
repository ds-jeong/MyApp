package com.demo.MyApp.Qna.Controller;

import com.demo.MyApp.Qna.Dto.QnaDto;
import com.demo.MyApp.Qna.Service.QnaServiceImpl;
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
