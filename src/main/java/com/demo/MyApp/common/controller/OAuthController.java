package com.demo.MyApp.common.controller;

import com.demo.MyApp.common.service.OAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class OAuthController {

    @Autowired
    private OAuthService oAuthService;

    @GetMapping("/oauth/callback/kakao")
    public String kakaoCallback(@RequestParam(value = "code", required = false) String code) throws Exception {
        String access_token = oAuthService.getKaKaoAccessToken(code);
        System.out.println("###access_token = " + access_token);

        return "";
    }


}
