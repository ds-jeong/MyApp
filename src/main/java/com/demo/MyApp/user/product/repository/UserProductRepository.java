package com.demo.MyApp.user.product.repository;

import com.demo.MyApp.admin.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserProductRepository extends JpaRepository<Product,Long> {

    List<Product>  findAllByOrderByFavoriteDesc() throws Exception;

    List<Product> findAllByOrderByPriceAsc() throws Exception;

    List<Product> findAllByOrderByViewsDesc() throws Exception;

    List<Product> findAllByOrderByTotalSalesDesc() throws Exception;

}
