package com.demo.MyApp.admin.qna.repository;

import com.demo.MyApp.admin.qna.entity.Qna;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QnaRepository extends JpaRepository<Qna,Long> {
}
