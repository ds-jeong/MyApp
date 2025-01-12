package com.demo.MyApp;

import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    //메인페이지 상품리스트
    @GetMapping("/main")
    public String main() {
        return "메인페이지";
    }
}
