package com.demo.MyApp.admin.order.service;

import com.demo.MyApp.admin.order.dto.OrderDto;

import java.util.List;
import java.util.Map;

public interface OrderService {

    List<Map<String, Object>> getAllOrders() throws Exception;

    boolean updateOrderStatus(Long orderId, OrderDto request) throws Exception;
}
