package com.demo.MyApp.user.qna.repository;

import com.demo.MyApp.user.qna.entity.Qna;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QnaRepository extends JpaRepository<Qna,Long> {
}
