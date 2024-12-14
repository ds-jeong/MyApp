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
import java.util.Map;

public interface OrderRepository extends JpaRepository<Order,Long> {
    Long findOrderIdByOrderNumber(String orderNumber);

    @Query(value = "SELECT o.order_id AS orderId, DATE_FORMAT(o.order_date, '%Y-%m-%d') AS orderDate, p.product_nm AS productNm, o.status, " +
            "od.quantity, u.user_nm AS userNm, o.state AS orderStatus, o.order_number AS trackingNumber, " +
            "o.shipping_company AS shippingCompany, o.tracking_number AS trackingNumber, p.file_path AS filePath " +
            "FROM `order` o " +
            "JOIN order_detail od ON o.order_id = od.order_id " +
            "JOIN product p ON od.product_id = p.product_id " +
            "JOIN user u ON o.user_id = u.id", nativeQuery = true)
    List<Map<String, Object>> getAllOrders();

    @Query("SELECT o.orderDate, o.totalPayment FROM Order o WHERE o.orderStatus = :s")
    List<Order> findByStatus(@Param("s") OrderStatus orderStatus);

//    @Query("SELECT o.totalPayment FROM Order o WHERE o.OrderId =: id")
//    Long findTotalPaymentByOrderId(@Param("id") Long orderId);




}
