package com.demo.MyApp.admin.order.repository;

import com.demo.MyApp.admin.order.entity.OrderStatusHist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderStatusHistRepository extends JpaRepository<OrderStatusHist,Long> {



}
