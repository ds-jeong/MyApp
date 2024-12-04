package com.demo.MyApp.user.payment.repository;

import com.demo.MyApp.user.payment.dto.PaymentDto;
import com.demo.MyApp.user.payment.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    @Query("SELECT new com.demo.MyApp.user.payment.dto.PaymentDto(p.impUid, p.amount, p.checksum) FROM Payment p WHERE p.order.orderId = ?1")
    PaymentDto findPaymentsByOrderId(Long orderId);

    @Modifying
    @Transactional
    @Query("UPDATE Payment p SET p.status = :status, p.checksum = :checksum, p.updatedAt = :updatedAt WHERE p.order.orderId = :orderId")
    void updatePaymentByOrderId(@Param("orderId") Long orderId,
                                 @Param("status") String status,
                                 @Param("checksum") int checksum,
                                 @Param("updatedAt") LocalDateTime updatedAt);

}
