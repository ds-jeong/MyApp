package com.demo.MyApp.admin.order.controller;

import com.demo.MyApp.admin.order.dto.OrderDto;
import com.demo.MyApp.admin.order.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/getAllOrders")
    public List<Map<String,Object>> getAllOrders() throws Exception{

        /* 관리자 > 주문관리 */
        return orderService.getAllOrders();
    }

    @PutMapping("/updateOrderStatus/{orderId}")
    public ResponseEntity<String> updateOrderStatus(@PathVariable("orderId") Long orderId, @RequestBody OrderDto request) {
        try {

            boolean isUpdated = orderService.updateOrderStatus(orderId, request);
            if (isUpdated) {
                return ResponseEntity.ok("주문 상태가 업데이트되었습니다.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("주문 상태 업데이트에 실패했습니다.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류가 발생했습니다.");
        }
    }

}
