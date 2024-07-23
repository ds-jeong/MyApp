package com.demo.MyApp.common.repository;

import com.demo.MyApp.common.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {

}
