package com.demo.MyApp.user.myPage.service;

import com.demo.MyApp.common.repository.UserRepository;
import com.demo.MyApp.user.order.repository.UserOrderDetailRepository;
import com.demo.MyApp.user.order.repository.UserOrderRepository;
import jakarta.persistence.Tuple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MyPageServiceImpl implements MyPageService {

    @Autowired
    private UserOrderDetailRepository userOrderDetailRepository;

    @Override
    public List<Map<String, Object>> orderHistory(Long id) throws Exception {

        /* 주문정보 */
        List<Tuple> orders = userOrderDetailRepository.findOrderDetailsByUserId(id);
        List<Map<String, Object>> orderHistoryList = new ArrayList<>();

        /* 주문정보를 map에 매핑 */
        for (Tuple order : orders) {
            Map<String, Object> orderDetailMap = new HashMap<>();
            orderDetailMap.put("orderId", order.get("orderId"));
            orderDetailMap.put("orderNumber", order.get("orderNumber"));
            orderDetailMap.put("orderDate", order.get("orderDate"));
            orderDetailMap.put("orderDetailId", order.get("orderDetailId"));
            orderDetailMap.put("state", order.get("state"));
            orderDetailMap.put("quantity", order.get("quantity"));
            orderDetailMap.put("productId", order.get("productId"));
            orderDetailMap.put("price", order.get("price"));
            orderDetailMap.put("filePath", order.get("filePath"));
            orderDetailMap.put("productNm", order.get("productNm"));

            orderHistoryList.add(orderDetailMap);
        }

        return orderHistoryList;
    }
}
