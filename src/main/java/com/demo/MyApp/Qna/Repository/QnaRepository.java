package com.demo.MyApp.Qna.Repository;

import com.demo.MyApp.Qna.Entity.Qna;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QnaRepository extends JpaRepository<Qna,Long> {
}
