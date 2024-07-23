package com.demo.MyApp.common.controller;

import com.demo.MyApp.common.dto.UserDto;
import com.demo.MyApp.common.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/user", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

    @Autowired
    private UserServiceImpl userService;

    @PostMapping("/join")
    public String registerUser(@ModelAttribute UserDto userDto) throws Exception{
        String userNm = userDto.getUserNm();
        // 아이디 중복 체크
        if (userService.isUsernameExists(userNm)) {
            return "이미 사용 중인 아이디입니다.";
        }

        // 회원가입 처리
        userService.registerUser(userDto);

        return "회원가입이 완료되었습니다.";
    }
}
