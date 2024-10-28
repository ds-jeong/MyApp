package com.demo.MyApp.user.order.controller;

import com.demo.MyApp.admin.order.entity.Order;
import com.demo.MyApp.admin.order.entity.OrderDetail;
import com.demo.MyApp.admin.product.entity.Product;
import com.demo.MyApp.user.order.dto.UserOrderDto;
import com.demo.MyApp.user.order.service.UserOrderService;
import com.demo.MyApp.user.product.dto.UserProductDto;
import com.demo.MyApp.user.product.service.UserProductService;
import com.mysql.cj.x.protobuf.MysqlxDatatypes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user/order")
public class UserOrderController {

    @Autowired
    private UserOrderService userOrderService;

    @Autowired
    private UserProductService userProductService;

    @GetMapping("/orderCartItemDetail")
    public List<Map<MysqlxDatatypes.Scalar.String,Object>> orderCartItemDetail(@RequestParam("id") Long id, @RequestParam("cartItemIds") String cartItemIds) throws Exception{

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
    public Order insertOrder(@RequestBody UserOrderDto userOrderDto) throws Exception{
        /* 사용자 > 주문하기 */
        return userOrderService.insertOrder(userOrderDto);
    }

    @GetMapping("/orderDetails")
    public List<UserProductDto> getOrderDetails(@RequestParam("orderId") Long orderId) throws Exception{
        List<OrderDetail> orderDetails = userOrderService.getOrderDetails(orderId);
        List<UserProductDto> productInfoList = new ArrayList<>();

        for (OrderDetail orderDetail : orderDetails) {
            int quantity = orderDetail.getQuantity();
            Product product  = orderDetail.getProduct();
            String productName = product.getProductNm();

            UserProductDto productInfo = new UserProductDto(productName, quantity);
            productInfoList.add(productInfo);
        }
        System.out.println("orderInfo return value" + productInfoList) ;

        return productInfoList;
    }

    @GetMapping("/getOrderId")
    public Long getOrderId(@RequestParam("orderNumber") String orderNumber) throws Exception{
        return userOrderService.getOrderId(orderNumber);
    }

    @GetMapping("/orderInfo")
    public ResponseEntity<Order> getOrderInfo(@RequestParam("orderId") Long orderId) throws Exception {
        System.out.println("cont 1 ###################" + orderId) ;
        Order o = userOrderService.getOrderInfo(orderId);
        System.out.println("cont 2 ###################" + o) ;
        if (o == null) {
            return ResponseEntity.notFound().build(); // Return 404 if the order is not found
        }
        return ResponseEntity.ok(o);
    }


    @GetMapping("/productName")
    public Map<Long, String> getProductName(@RequestParam("orderId") Long orderId) throws Exception {
        List<Long> productIdList = userOrderService.getProductIdList(orderId);
        Map<Long, String> productNameMap = new HashMap<>();
        for(Long productId : productIdList){
            productNameMap.put(productId, userProductService.getProductName(productId));
        }
        return productNameMap;
    }


}
