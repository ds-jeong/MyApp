package com.demo.MyApp.common.repository;

import com.demo.MyApp.common.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserId(String userId);
    User findByUserNm(String userNm);
    User findByPhone(String phone);
    User findByEmail(String email);
}