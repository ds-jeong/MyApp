package com.demo.MyApp.admin.product.repository;

import com.demo.MyApp.admin.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {

}
