package com.demo.MyApp.common.controller;

import com.demo.MyApp.common.entity.User;
import com.demo.MyApp.common.repository.UserRepository;
import com.demo.MyApp.common.service.OAuthService;
import com.demo.MyApp.common.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@Controller
public class OAuthController {

    @Autowired
    private OAuthService oAuthService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/oauth/callback/kakao")
    public ResponseEntity<?> kakaoCallback(@RequestParam(value = "code", required = false) String code) throws Exception {
        String access_token = oAuthService.getKaKaoAccessToken(code);

        HashMap<String, Object> userKakaoInfo = oAuthService.getUserKakaoInfo(access_token);
        String id = (String) userKakaoInfo.get("id"); //kakao id는 userID와 대치
        String email = (String) userKakaoInfo.get("email"); //kakao id는 userID와 대치
        String name = (String) userKakaoInfo.get("name"); //kakao id는 userID와 대치
        String phone_number = (String) userKakaoInfo.get("phone_number"); //kakao id는 userID와 대치


//        // 회원가입 여부 확인
//        if (userService.isUserRegistered(id)) {
        if (id != null) {
            String jwtToken = oAuthService.kakaoLogin(id);
            System.out.println("###jwttoken: " + jwtToken);
            return ResponseEntity.ok(jwtToken);
        }
//        } else {
//            User newUser = new User();
//            newUser.setUserNm("kakao_" + providerId);  // 카카오 ID로 고유한 사용자명 설정
//            newUser.setEmail(userKakaoInfo.get("email").toString());
//            newUser.setPw("-1");  // 비밀번호는 기본값으로 설정하거나 랜덤하게 생성
//
//            userRepository.save(newUser);
//            oAuthService.kakaoLogin(userKakaoInfo);
//        }
        return ResponseEntity.ok("..");
    }

}
