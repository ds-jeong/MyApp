package com.demo.MyApp.admin.order.repository;

import com.demo.MyApp.admin.order.entity.Order;
import com.demo.MyApp.admin.order.entity.OrderStatus;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import com.demo.MyApp.admin.shipping.dto.ShippingDto;
import org.springframework.data.repository.query.Param;

import java.util.Dictionary;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order,Long> {
    Long findOrderIdByOrderNumber(String orderNumber);

    @Query("SELECT o.orderDate, o.totalPayment FROM Order o WHERE o.orderStatus = :s")
    List<Order> findByStatus(@Param("s") OrderStatus orderStatus);

//    @Query("SELECT o.totalPayment FROM Order o WHERE o.OrderId =: id")
//    Long findTotalPaymentByOrderId(@Param("id") Long orderId);




}
