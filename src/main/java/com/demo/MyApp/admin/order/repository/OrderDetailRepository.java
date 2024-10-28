package com.demo.MyApp.admin.order.repository;

import com.demo.MyApp.admin.order.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepository extends JpaRepository<OrderDetail,Long> {
}
