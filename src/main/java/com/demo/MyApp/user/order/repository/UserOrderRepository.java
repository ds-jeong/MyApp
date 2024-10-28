package com.demo.MyApp.user.order.repository;

import com.demo.MyApp.admin.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserOrderRepository extends JpaRepository<Order,Long> {

    Order findOrderByOrderNumber(String orderNumber);

    @Query("SELECT o.orderId FROM Order o WHERE o.orderNumber = :orderNumber")
    Long findOrderIdByOrderNumber(@Param("orderNumber") String orderNumber);

    Order findOrderByOrderId(Long orderId);

}
