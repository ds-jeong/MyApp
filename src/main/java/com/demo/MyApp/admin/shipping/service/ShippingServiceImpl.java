package com.demo.MyApp.admin.shipping.service;

import com.demo.MyApp.admin.order.entity.Order;
import com.demo.MyApp.admin.order.entity.OrderStatus;
import com.demo.MyApp.admin.shipping.dto.ShippingDto;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import com.demo.MyApp.admin.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ShippingServiceImpl implements ShippingService{

    @Autowired
    private final OrderRepository orderRepository;

    @Override
    public List<Map<String, Object>> userShipData() throws Exception {
        List<Order> orderShipData = orderRepository.findAll();
        List<Map<String, Object>> orderShipDataList = new ArrayList<>();

        for(Order tuple : orderShipData){
            Map<String, Object> orderShipDataMap = new HashMap<>();
            orderShipDataMap.put("orderNumber", tuple.getOrderNumber());
            orderShipDataMap.put("orderDate", tuple.getOrderDate());
            orderShipDataMap.put("recipient", tuple.getRecipient());
            orderShipDataMap.put("status", tuple.getStatus());

            orderShipDataList.add(orderShipDataMap);
        }

        return orderShipDataList;
    }

    @Transactional
    @Override
    public void changeState(Long orderId, OrderStatus newStatus) throws Exception {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        Order order = optionalOrder.orElseThrow(() -> new IllegalArgumentException("Order not found"));
        order.setStatus(newStatus);

        orderRepository.save(order);
    }
}
