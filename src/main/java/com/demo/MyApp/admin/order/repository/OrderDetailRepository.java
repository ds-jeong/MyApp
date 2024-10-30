package com.demo.MyApp.admin.order.repository;

import com.demo.MyApp.admin.order.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderDetailRepository extends JpaRepository<OrderDetail,Long> {
    int countByProduct_ProductId(Long productId);

    @Query("SELECT SUM(od.quantity) FROM OrderDetail od WHERE od.product.productId = :productId")
    Integer sumQuantityByProductId(@Param("productId") Long productId);
}
