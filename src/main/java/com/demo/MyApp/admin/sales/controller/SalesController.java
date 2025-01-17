package com.demo.MyApp.admin.sales.controller;

import com.demo.MyApp.admin.sales.service.SalesService;
import com.demo.MyApp.admin.sales.service.SalesServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.demo.MyApp.admin.sales.dto.SalesDto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/sales")
public class SalesController {
    //{
    //  "totalRevenue": 150000,
    //  "totalOrders": 320,
    //  "totalProducts": 580
    //}

    //상품별/주별/월별/시간대별 매출, 환불율, 카테고리별 매출,  지역별,
    @Autowired
    private SalesServiceImpl salesService;

    @GetMapping("/summary")
    public SalesDto salesSummary() throws Exception{
        return salesService.salesSummary();
    }

    @GetMapping("/data")
    public List<SalesDto> salesData() throws Exception{
        return salesService.salesData();
    }

    @GetMapping("/topSalesData")
    public Map<String, Integer> topSalesData() throws Exception{
        return salesService.topSalesData();
    }


}
