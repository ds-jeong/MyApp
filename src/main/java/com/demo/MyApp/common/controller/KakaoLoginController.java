package com.demo.MyApp.common.controller;

import com.demo.MyApp.common.dto.UserDto;
import com.demo.MyApp.common.repository.UserRepository;
import com.demo.MyApp.common.service.KakaoLoginService;
import com.demo.MyApp.common.service.UserService;
import com.demo.MyApp.config.security.jwt.JwtFilter;
import com.demo.MyApp.config.security.jwt.TokenResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@Controller
public class KakaoLoginController {

    @Autowired
    private KakaoLoginService kakaoLoginService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/oauth/callback/kakao")
    public ResponseEntity<?> kakaoCallback(@RequestParam(value = "code", required = false) String code) throws Exception {
        String access_token = kakaoLoginService.getKaKaoAccessToken(code);

        HashMap<String, Object> userKakaoInfo = kakaoLoginService.getUserKakaoInfo(access_token);
        String id = (String) userKakaoInfo.get("id"); //kakao id는 userID와 대치
        String email = (String) userKakaoInfo.get("email"); //kakao id는 userID와 대치
        String name = (String) userKakaoInfo.get("name"); //kakao id는 userID와 대치
        String phone_number = (String) userKakaoInfo.get("phone_number"); //kakao id는 userID와 대치
        System.out.println(id + "  " + "email" + email + "  " + "name" + name + "  " + "phone_number" + phone_number);

        // 회원가입 여부 확인
        if (userService.isUsernameExists(email)) {
            String jwtToken = kakaoLoginService.createToken(id);
            System.out.println("###jwttoken: " + jwtToken);

            UserDto userInfo = userService.selectUserInfoByEmail(email);

            // 5. 생성한 JWT 토큰을 Response Header에 담아서 리턴한다.
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwtToken);

            return ResponseEntity.status(HttpStatus.OK).headers(httpHeaders).body(new TokenResponseDto(jwtToken, userInfo));
        } else { //첫 로그인
            UserDto userInfo = new UserDto();

            userInfo.setUserNm(email);
            userInfo.setPw("-1");
            userInfo.setEmail(email);
            userInfo.setPhone(phone_number);

            userService.registerUser(userInfo);

            String jwtToken = kakaoLoginService.createToken(id);
            // 5. 생성한 JWT 토큰을 Response Header에 담아서 리턴한다.
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwtToken);

            return ResponseEntity.status(HttpStatus.OK).headers(httpHeaders).body(new TokenResponseDto(jwtToken, userInfo));
        }


    }

}
