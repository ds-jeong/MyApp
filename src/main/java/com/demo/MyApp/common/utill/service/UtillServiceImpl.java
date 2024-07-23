package com.demo.MyApp.common.utill.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;

@Service
public class UtillServiceImpl implements UtillService{

    //저장 될 파일 위치
    private static final String UPLOAD_DIR = "C:\\localProject\\MyApp\\src\\main\\frontend\\public\\upload\\";

    @Override
    public void imgUpload(MultipartFile file) throws Exception {

        // Create directory if it doesn't exist
        File uploadDir = new File(UPLOAD_DIR+"img");
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

    }
}
