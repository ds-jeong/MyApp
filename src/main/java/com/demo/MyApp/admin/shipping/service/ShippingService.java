package com.demo.MyApp.admin.shipping.service;

import com.demo.MyApp.admin.order.entity.OrderStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

public interface ShippingService {

    List<Map<String, Object>> userShipData() throws Exception;

    void changeState(Long orderId, OrderStatus newStatus) throws Exception;
}
