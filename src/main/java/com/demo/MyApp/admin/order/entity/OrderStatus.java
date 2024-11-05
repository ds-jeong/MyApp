package com.demo.MyApp.admin.order.entity;

public enum OrderStatus {

    /**
     * PENDING: 주문이 접수되었으나 아직 처리되지 않은 상태.
     * 예: 주문이 확인되지 않거나 결제 완료 전의 상태.
     */
    PENDING,

    /**
     * SHIPPED: 주문이 출고되어 배송이 시작된 상태.
     * 예: 상품이 배송 준비 중이거나, 택배사가 상품을 픽업한 상태.
     */
    SHIPPED,

    /**
     * IN_TRANSIT: 상품이 배송 중인 상태.
     * 예: 상품이 물류 센터를 떠나 고객에게 배송되는 과정에 있는 상태.
     */
    IN_TRANSIT,

    /**
     * DELIVERED: 상품이 고객에게 성공적으로 전달된 상태.
     * 예: 상품이 고객에게 도착하고 배송이 완료된 상태.
     */
    DELIVERED,

    /**
     * CANCELLED: 주문이 취소된 상태.
     * 예: 고객의 요청 또는 시스템 상의 문제로 주문이 취소된 상태.
     */
    CANCELLED,

    /**
     * PENDING: 반품 요청이 접수되었지만 아직 처리되지 않은 상태.
     * 예: 반품 사유 확인 중, 승인 대기 중인 상태.
     */
    RETURN_PENDING,

    /**
     * PROCESSING: 반품 요청이 진행 중인 상태.
     * 예: 반품 승인 후 물류 처리 또는 환불 과정 중.
     */
    RETURN_PROCESSING,

    /**
     * COMPLETED: 반품 요청이 완료된 상태.
     * 예: 반품이 승인되어 환불 처리 또는 교환이 완료된 상태.
     */
    RETURN_COMPLETED,
}
