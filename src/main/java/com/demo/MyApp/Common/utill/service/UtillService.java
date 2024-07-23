package com.demo.MyApp.Common.utill.service;

import org.springframework.web.multipart.MultipartFile;

public interface UtillService {
    void imgUpload(MultipartFile file) throws Exception;
}
