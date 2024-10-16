package com.demo.MyApp.user.order.controller;

import com.demo.MyApp.user.order.dto.UserOrderDto;
import com.demo.MyApp.user.order.service.UserOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user/order")
public class UserOrderController {

    @Autowired
    private UserOrderService userOrderService;

    @GetMapping("/orderCartItemDetail")
    public List<Map<String,Object>> orderCartItemDetail(@RequestParam("id") Long id, @RequestParam("cartItemIds") String cartItemIds) throws Exception{

        if (cartItemIds == null || cartItemIds.isEmpty()) {
            throw new IllegalArgumentException("No cart item IDs provided.");
        }

        List<Long> cartItemIdList = Arrays.stream(cartItemIds.split(","))
                .map(Long::valueOf)
                .collect(Collectors.toList());

        /* 사용자 > 장바구니 > 선택 상품 */
        return userOrderService.orderCartItemDetail(id, cartItemIdList);
    }

    @PostMapping("/insertOrder")
    public void insertOrder(@RequestBody UserOrderDto userOrderDto) throws Exception{
        /* 사용자 > 주문하기 */
        userOrderService.insertOrder(userOrderDto);
//        return userOrderService.insertOrder(userOrderDto);
    }

}
