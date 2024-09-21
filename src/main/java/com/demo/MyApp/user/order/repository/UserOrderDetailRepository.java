package com.demo.MyApp.user.order.repository;

import com.demo.MyApp.admin.order.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserOrderDetailRepository extends JpaRepository<OrderDetail,Long> {

}
