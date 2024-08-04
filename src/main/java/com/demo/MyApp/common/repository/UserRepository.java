package com.demo.MyApp.common.repository;

import com.demo.MyApp.common.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserId(String userId);
    User findByUserNm(String userNm);
}