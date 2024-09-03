package com.demo.MyApp.config.aws.s3;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Component
public class S3Uploader {
    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public S3Uploader(AmazonS3Client amazonS3Client) {
        this.amazonS3Client = amazonS3Client;
    }

    /* S3는 MultipartFile 전송 x, 업로드 전 File로 Convert */
    public String uploadFiles(
            MultipartFile multipartFile, String dirName) throws IOException {
        File uploadFile = convert(multipartFile).orElseThrow(() ->
                new IllegalArgumentException("error: MultipartFile -> File convert fail"));
        return upload(uploadFile, dirName);
    }
    private Optional<File> convert(MultipartFile file) throws IOException {

        String dirPath = "upload/image";
        File directory = new File(dirPath);

        /* 디렉토리가 존재하지 않으면 생성 */
        if (!directory.exists()) {
            directory.mkdirs();
        }

        /* 파일 이름 검증 및 변환 */
        String fileName = file.getOriginalFilename().replaceAll("[^a-zA-Z0-9.-]", "_");
        File convertFile = new File(dirPath + "/" + fileName);
        removeNewFile(convertFile);
        try {
            if (convertFile.createNewFile()) {
                try (FileOutputStream fileOutputStream = new FileOutputStream(convertFile)) {
                    fileOutputStream.write(file.getBytes());
                }
                return Optional.of(convertFile);
            }
        } catch (IOException e) {
            e.printStackTrace(); // 로그에 출력
        }
        return Optional.empty();
    }

    /* 업로드 전 파일명 랜덤 Setting */
    public String upload(File uploadFile, String filePath) {
        String fileName = filePath + "/" + UUID.randomUUID() + uploadFile.getName();
        String uploadImageUrl = putS3(uploadFile, fileName);
        removeNewFile(uploadFile);
        return uploadImageUrl;
    }

    /* S3에 파일 넣기 */
    private String putS3(File uploadFile, String fileName) {
        amazonS3Client.putObject(
                new PutObjectRequest(bucket, fileName, uploadFile)
                        .withCannedAcl(CannedAccessControlList.PublicRead));
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    /* 임시파일 삭제 */
    private void removeNewFile(File targetFile) {
        if (targetFile.delete()) {
            System.out.println("File delete success");
            return;
        }
        System.out.println("File delete fail");
    }

    /* 이미지 수정으로 인해 기존 이미지 삭제 */
    public void deleteImage(String fileUrl) {
        String splitStr = ".com/";
        String fileName = fileUrl.substring(fileUrl.lastIndexOf(splitStr) + splitStr.length());

        amazonS3Client.deleteObject(new DeleteObjectRequest(bucket, fileName));
    }
}
