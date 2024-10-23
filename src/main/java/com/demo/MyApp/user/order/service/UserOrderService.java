package com.demo.MyApp.user.order.service;

import com.demo.MyApp.admin.order.entity.Order;
import com.demo.MyApp.admin.order.entity.OrderDetail;
import com.demo.MyApp.user.order.dto.UserOrderDto;

import java.util.List;
import java.util.Map;

public interface UserOrderService {

    List<Map<String,Object>> orderCartItemDetail(Long id, List<Long> cartItemIdList) throws Exception;

    Order insertOrder(UserOrderDto userOrderDto) throws Exception;

    List<OrderDetail> getOrderDetails(Long orderId) throws Exception;

    Long getOrderId(String orderNumber) throws Exception;

    Order getOrderInfo(Long orderId) throws Exception;

    List<Long> getProductIdList(Long orderId) throws Exception;


}
