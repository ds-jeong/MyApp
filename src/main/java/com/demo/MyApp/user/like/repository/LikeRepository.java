package com.demo.MyApp.user.like.repository;

import com.demo.MyApp.admin.product.entity.Product;
import com.demo.MyApp.common.entity.User;
import com.demo.MyApp.user.like.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {

    Optional<Like> findByUserAndProduct(User user, Product product);

    void deleteByUserAndProduct(User user, Product product);
}
