package com.demo.MyApp.user.payment.repository;

import com.demo.MyApp.user.payment.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
