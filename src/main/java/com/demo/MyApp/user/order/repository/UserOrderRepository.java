package com.demo.MyApp.user.order.repository;

import com.demo.MyApp.admin.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserOrderRepository extends JpaRepository<Order,Long> {

}
