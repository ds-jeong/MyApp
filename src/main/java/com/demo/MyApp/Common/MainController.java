package com.demo.MyApp.Common;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    //메인페이지 Bast 상품리스트
    @GetMapping("/mainSlider")
    public String[] mainSlider() {
        String[] products = {"product5", "product6", "product7", "product8", "product9"};
        return products;
    }
    //메인페이지 상품리스트
    @GetMapping("/main")
    public String[] main() {
        String[] products = {"product1", "product2", "product3", "product4", "product5", "product6", "product7", "product8", "product9"};
        return products;
    }
}
