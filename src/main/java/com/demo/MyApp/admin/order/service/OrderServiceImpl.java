package com.demo.MyApp.admin.order.service;

import com.demo.MyApp.admin.order.dto.OrderDto;
import com.demo.MyApp.admin.order.entity.Order;
import com.demo.MyApp.admin.order.entity.OrderStatus;
import com.demo.MyApp.admin.order.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Override
    public List<Map<String, Object>> getAllOrders() {
        return orderRepository.getAllOrders();
    }

    @Override
    public boolean updateOrderStatus(Long orderId, OrderDto request) throws Exception {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            order.setStatus(OrderStatus.valueOf(request.getStatus()));
            order.setTrackingNumber(request.getTrackingNumber());
            order.setShippingCompany(request.getShippingCompany());
            orderRepository.save(order);
            return true;
        }
        return false;
    }
}
