package com.demo.MyApp.user.order.repository;

import com.demo.MyApp.admin.order.entity.OrderDetail;
import com.demo.MyApp.user.order.dto.UserOrderDetailDto;
import jakarta.persistence.Tuple;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface UserOrderDetailRepository extends JpaRepository<OrderDetail,Long> {
    List<OrderDetail> findByOrder_orderId(Long orderId);

    List<Long> findProductIdByOrder_orderId(Long orderId);

    @Query("SELECT o.orderId AS orderId" +
            ", o.orderNumber AS orderNumber" +
            ", DATE_FORMAT(o.orderDate, '%Y-%m-%d') AS orderDate" +
            ", o.state AS state" +
            ", od.orderDetailId AS orderDetailId" +
            ", od.quantity AS quantity" +
            ", p.productId AS productId" +
            ", p.price AS price" +
            ", p.filePath AS filePath" +
            ", p.productNm AS productNm " +
            ", r.status AS returnReqStatus " +
            "FROM Order o " +
            "JOIN o.orderDetails od " +
            "JOIN od.product p " +
            "LEFT JOIN ReturnRequest r ON od.orderDetailId = r.orderDetail.orderDetailId " +
            "WHERE o.user.id = :userId")
    List<Tuple> findOrderDetailsByUserId(@Param("userId") Long userId);
}