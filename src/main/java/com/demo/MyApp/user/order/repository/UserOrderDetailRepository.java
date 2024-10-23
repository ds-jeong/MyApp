package com.demo.MyApp.user.order.repository;

import com.demo.MyApp.admin.order.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserOrderDetailRepository extends JpaRepository<OrderDetail,Long> {
    List<OrderDetail> findByOrder_orderId(Long orderId);

    List<Long> findProductIdByOrder_orderId(Long orderId);
}