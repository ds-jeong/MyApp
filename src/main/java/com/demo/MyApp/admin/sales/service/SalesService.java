package com.demo.MyApp.admin.sales.service;


import com.demo.MyApp.admin.sales.dto.SalesDto;

import java.util.List;
import java.util.Map;

public interface SalesService {

    SalesDto salesSummary() throws Exception;

    List<SalesDto> salesData() throws Exception;

    Map<String, Integer> topSalesData() throws Exception;
}
