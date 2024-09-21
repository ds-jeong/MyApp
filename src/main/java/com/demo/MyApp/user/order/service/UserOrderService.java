package com.demo.MyApp.user.order.service;

import com.demo.MyApp.user.order.dto.UserOrderDto;

import java.util.List;
import java.util.Map;

public interface UserOrderService {

    List<Map<String,Object>> orderCartItemDetail(Long id, List<Long> cartItemIdList) throws Exception;

    void insertOrder(UserOrderDto userOrderDto) throws Exception;
}
