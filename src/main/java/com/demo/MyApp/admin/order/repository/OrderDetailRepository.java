package com.demo.MyApp.admin.order.repository;

import com.demo.MyApp.admin.order.entity.OrderDetail;
import com.demo.MyApp.admin.sales.dto.SalesDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderDetailRepository extends JpaRepository<OrderDetail,Long> {
    int countByProduct_ProductId(Long productId);

    @Query("SELECT o.order.orderId FROM OrderDetail o WHERE o.orderDetailId = :odId")
    Long findOrder_OrderIdByOrderDetailId(@Param("odId") Long orderDetailId);

    @Query("SELECT SUM(od.quantity) FROM OrderDetail od WHERE od.product.productId = :productId")
    Integer sumQuantityByProductId(@Param("productId") Long productId);

    @Query("SELECT SUM(od.quantity) FROM OrderDetail od WHERE od.product.productId = :productId")
    Integer findQuantityByProductId(@Param("productId") Long productId);
}
