package com.demo.MyApp;

import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    //메인페이지 상품리스트
    @GetMapping("/main")
    public String main(HttpSession session) {
//        Authentication authentication1 = SecurityContextHolder.getContext().getAuthentication();
//        Authentication authentication2 = null;
//
//        if (session.getAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY)
//                instanceof SecurityContext securityContext) {   // java 17 문법입니다!
//            authentication2 = securityContext.getAuthentication();
//        }

        return "메인페이지";
    }
}
