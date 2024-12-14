package com.demo.MyApp.admin.shipping.controller;

import com.demo.MyApp.admin.order.entity.OrderStatus;
import com.demo.MyApp.admin.shipping.service.ShippingService;
import com.demo.MyApp.admin.shipping.service.ShippingServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin/shipping")
public class ShippingController {

    @Autowired
    private ShippingServiceImpl shippingService;

    @GetMapping("/userShipData")
    private List<Map<String, Object>> allUserShipData() throws Exception{
        return shippingService.userShipData();
    }

    @PostMapping("/changeState")
    private void changeState(@RequestParam("orderId") Long orderId, String newState) throws Exception {
        OrderStatus ost = OrderStatus.valueOf(newState);
        shippingService.changeState(orderId, ost);
    }
}
