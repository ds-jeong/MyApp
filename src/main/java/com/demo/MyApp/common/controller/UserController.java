package com.demo.MyApp.common.controller;

import com.demo.MyApp.common.dto.UserDto;
import com.demo.MyApp.common.service.UserServiceImpl;
import com.demo.MyApp.config.security.jwt.JwtFilter;
import com.demo.MyApp.config.security.jwt.JwtTokenProvider;
import com.demo.MyApp.config.security.jwt.TokenResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private AuthenticationManagerBuilder authenticationManager;
    @Autowired
    private UserServiceImpl userService;

    @PostMapping("/join")
    public String registerUser(@ModelAttribute UserDto userDto) throws Exception {
        String userNm = userDto.getUserNm();
        // 아이디 중복 체크
        if (userService.isUsernameExists(userNm)) {
            return "이미 사용 중인 아이디입니다.";
        }

        // 회원가입 처리
        userService.registerUser(userDto);

        return "회원가입이 완료되었습니다.";
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponseDto> login(@ModelAttribute UserDto userDto) {

        //1. AuthenticationManager를 통해 인증을 시도하고 인증이 성공하면 Authentication 객체를 리턴받는다.
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userDto.getUserId(), userDto.getPw());

        //UserDetailsServiceImpl의 loadUserByUsername() 메소드가 실행된다.
        Authentication authentication = authenticationManager.getObject().authenticate(authenticationToken);

        //2. SecurityContextHolder에 위에서 생성한 Authentication 객체를 저장한다.
        SecurityContextHolder.getContext().setAuthentication(authentication);

        //3. JwtTokenProvider를 통해 JWT 토큰을 생성한다.
        String jwtToken = jwtTokenProvider.createToken(authentication);

        // 4. 유저 정보를 조회한다.
        UserDto userInfo = userService.selectUserInfo(userDto);

        // 5. 생성한 JWT 토큰을 Response Header에 담아서 리턴한다.
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwtToken);


        return ResponseEntity.status(HttpStatus.OK).headers(httpHeaders).body(new TokenResponseDto(jwtToken, userInfo));
    }

}
