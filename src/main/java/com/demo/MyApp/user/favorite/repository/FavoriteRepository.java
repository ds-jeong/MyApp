package com.demo.MyApp.user.favorite.repository;

import com.demo.MyApp.admin.product.entity.Product;
import com.demo.MyApp.common.entity.User;
import com.demo.MyApp.user.favorite.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    Optional<Favorite> findByUserAndProduct(User user, Product product);

    void deleteByUserAndProduct(User user, Product product);
}
