package com.demo.MyApp.admin.order.repository;

import com.demo.MyApp.admin.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order,Long> {
    Long findOrderIdByOrderNumber(String orderNumber);

}
