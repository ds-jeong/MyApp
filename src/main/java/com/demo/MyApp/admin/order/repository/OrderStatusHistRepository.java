package com.demo.MyApp.admin.order.repository;

import com.demo.MyApp.admin.order.entity.OrderStatus;
import com.demo.MyApp.admin.order.entity.OrderStatusHist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderStatusHistRepository extends JpaRepository<OrderStatusHist,Long> {

    @Query("SELECT o.orderDetail.orderDetailId FROM OrderStatusHist o WHERE o.status = :status")
    List<Long> findOrderDetail_OrderDetailIdByStatus(@Param("status") OrderStatus status);


}
