package com.demo.MyApp.user.order.repository;

import com.demo.MyApp.admin.order.entity.OrderStatusHist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserOrderStatusHistRepository extends JpaRepository<OrderStatusHist,Long> {
}
