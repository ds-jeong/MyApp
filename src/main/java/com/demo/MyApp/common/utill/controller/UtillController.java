package com.demo.MyApp.common.utill.controller;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@RestController
@RequestMapping("/utill")
public class UtillController {

    //저장 될 파일 위치
    private static final String UPLOAD_DIR = "C:\\file\\upload\\img";

    //이미지 파일 업로드 기능
    @PostMapping("/imgUpload")
    public String  imgUpload(@RequestParam("file") MultipartFile file) throws IOException {

        if (file.isEmpty()) {
            return "Please select a file to upload";
        }

        // Create directory if it doesn't exist
        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            try {
                uploadDir.mkdirs();
            }catch (Exception e){
                System.out.println(e.getMessage());
            }
        }

        // Save the file to the upload directory
        File uploadFile = new File(uploadDir.getAbsolutePath() + "/" + file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(uploadFile)) {
            fos.write(file.getBytes());
        }

        return "File uploaded successfully";
    }
}
