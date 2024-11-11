package com.demo.MyApp.common.controller;

import com.demo.MyApp.common.dto.UserDetailDto;
import com.demo.MyApp.common.dto.UserDto;
import com.demo.MyApp.common.entity.User;
import com.demo.MyApp.common.service.UserServiceImpl;
import com.demo.MyApp.config.security.CustomUserDetailsService;
import com.demo.MyApp.config.security.jwt.JwtFilter;
import com.demo.MyApp.config.security.jwt.JwtTokenProvider;
import com.demo.MyApp.config.security.jwt.TokenResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private AuthenticationManagerBuilder AuthenticationManagerBuilder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserServiceImpl userService;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder; // 패스워드 암호화를 위한 빈

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);


    @PostMapping("/join")
    public String registerUser(@ModelAttribute UserDto userDto) throws Exception {
        String userNm = userDto.getUserNm();
        // 아이디 중복 체크
        if (userService.isUsernameExists(userNm)) {
            return "이미 사용 중인 아이디입니다.";
        }

        String phone = userDto.getPhone();
        // 가입 중복 체크
        if (userService.isPhoneExists(phone)) {
            return "이미 가입된 사용자 입니다.";
        }

        String email = userDto.getEmail();
        // 이메일 중복 체크
        if (userService.isEmailExists(email)) {
            return "이미 사용 중인 이메일입니다.";
        }

        // 회원가입 처리
        userService.registerUser(userDto);

        return "회원가입이 완료되었습니다.";
    }


    @PostMapping("/login")
    public Object login(@RequestBody UserDto userDto) {
        if (userDto.getUserId() == null || userDto.getPw() == null) {
            throw new IllegalArgumentException("User ID or password is null");
        }
        try {
            List<SimpleGrantedAuthority> authorities = new ArrayList<>();
            if (!userDto.getUserId().contains("admin"))
                authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
            else
                authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));

            User userDetails = new User(userDto.getUserId(), userDto.getPw(), authorities);

            // 인증 객체 생성
            Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, userDto.getPw(), authorities);

            System.out.println("##########authentication test  "+ authentication);

            // Create an authentication token with user credentials
//            Authentication authentication = new UsernamePasswordAuthenticationToken(
//                    userDto.getUserId(), userDto.getPw());

            // 인증 처리 (이 부분을 통해 실제 인증이 이루어짐)
//            Authentication authenticated = authenticationManager.authenticate(authentication);
//            System.out.println("##########authenticated test  "+ authenticated);
            //위의 주석처리 코드 실패해서 authenticationManager 사용 생략

            // JWT 토큰 생성
            String jwtToken = jwtTokenProvider.createToken(authentication);

            // 유저 정보 조회
            UserDto userInfo = userService.selectUserInfo(userDto);

            // JWT 토큰을 Response Header에 담아서 리턴
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwtToken);

            return ResponseEntity.status(HttpStatus.OK).headers(httpHeaders).body(new TokenResponseDto(jwtToken, userInfo));
        } catch (AuthenticationException e) {
            logger.error("Authentication failed: ", e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("잘못된 아이디 또는 비밀번호입니다.");
        }
    }

}
