package com.demo.MyApp.admin.sales.service;

import com.demo.MyApp.admin.order.entity.OrderDetail;
import com.demo.MyApp.admin.order.entity.OrderStatus;
import com.demo.MyApp.admin.order.repository.OrderDetailRepository;
import com.demo.MyApp.admin.order.repository.OrderRepository;
import com.demo.MyApp.admin.order.repository.OrderStatusHistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.demo.MyApp.admin.sales.dto.SalesDto;
import com.demo.MyApp.admin.order.entity.Order;

import java.util.*;

@Service
@RequiredArgsConstructor
public class SalesServiceImpl implements SalesService {

    @Autowired
    private OrderStatusHistRepository orderStatusHistRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public SalesDto salesSummary() throws Exception {
        //orderStatus의 status가 PURCHASE_CONFIRMED 인 것의 order id 합산, product id distinct
        List<Long> orderDetailIdList = orderStatusHistRepository.findOrderDetail_OrderDetailIdByStatus(OrderStatus.PURCHASE_CONFIRMED); //dummy data 있어야함

        Set<Long> orderIdSet = new HashSet<>();
        Long totalRevenue = 0L;
        for(Long oDId : orderDetailIdList) {
            Long orderId = orderDetailRepository.findOrder_OrderIdByOrderDetailId(oDId);
            //총 수익 계산
            totalRevenue += orderRepository.findById(orderId).get().getTotalPayment();

            //주문수 계산
            orderIdSet.add(orderId);
        }

        //        for(Long oDId : orderDetailIdList) {
//            //상품별 판매수
//            List<SalesDto> salesDto = orderDetailRepository.sumQuantityByProductId(oDId);
//        }
        return new SalesDto((long) orderIdSet.size(), totalRevenue);
    }

    @Override
    public List<SalesDto> salesData() throws Exception {
        List<Order> orderList = orderRepository.findByStatus(OrderStatus.PURCHASE_CONFIRMED);
        List<SalesDto> salesDtoList = new ArrayList<>();
        for(Order order : orderList) {
            SalesDto salesDto = new SalesDto(order.getTotalPayment(), order.getOrderDate());
            salesDtoList.add(salesDto);
        }

        return salesDtoList;
    }

    @Override
    public Map<String, Integer> topSalesData() throws Exception {
        List<Long> orderDetailIdList = orderStatusHistRepository.findOrderDetail_OrderDetailIdByStatus(OrderStatus.PURCHASE_CONFIRMED); //dummy data 있어야함

        Map<String, Integer> map = new HashMap<>();
        for(Long oDId : orderDetailIdList) {
            Optional<OrderDetail> od = orderDetailRepository.findById(oDId);

            String productNm = od.get().getProduct().getProductNm();
            int quantity = od.get().getQuantity();

            map.merge(productNm, quantity, Integer::sum);
        }

        return map;
    }
}
