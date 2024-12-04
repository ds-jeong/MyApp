package com.demo.MyApp.user.order.repository;

import com.demo.MyApp.admin.order.entity.OrderStatus;
import com.demo.MyApp.admin.order.entity.OrderStatusHist;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserOrderStatusHistRepository extends JpaRepository<OrderStatusHist,Long> {
    Optional<OrderStatusHist> findByOrderDetail_OrderDetailId(Long orderDetailId);

    boolean existsByOrderDetail_OrderDetailIdAndStatus(Long odId, OrderStatus orderStatus);

}
