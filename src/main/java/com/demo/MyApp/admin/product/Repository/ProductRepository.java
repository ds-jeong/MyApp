package com.demo.MyApp.admin.product.Repository;

import com.demo.MyApp.admin.product.Entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> {

}
