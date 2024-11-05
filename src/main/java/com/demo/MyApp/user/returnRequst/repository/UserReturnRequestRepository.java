package com.demo.MyApp.user.returnRequst.repository;

import com.demo.MyApp.admin.returnRequest.entity.ReturnRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserReturnRequestRepository extends JpaRepository<ReturnRequest,Long> {
}
