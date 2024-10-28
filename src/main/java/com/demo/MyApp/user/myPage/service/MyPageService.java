package com.demo.MyApp.user.myPage.service;

import java.util.List;
import java.util.Map;

public interface MyPageService {
    List<Map<String, Object>> orderHistory(Long id) throws Exception;
}
