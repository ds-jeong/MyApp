package com.demo.MyApp.user.order.service;

import java.util.List;
import java.util.Map;

public interface UserOrderService {

    List<Map<String,Object>> orderCartItemDetail(Long id, List<Long> cartItemIdList) throws Exception;
}
