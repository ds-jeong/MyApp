package com.demo.MyApp.user.payment.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class IamportCancelDto {
    private int code;
    private String message;

    @JsonProperty("response")
    private ResponseData responseData;

    @JsonIgnoreProperties(ignoreUnknown = true)
    @Data
    public static class ResponseData {
        private Long cancelled_at;
        private Long failed_at;

        public LocalDateTime getCancelledAtAsLocalDateTime() {
            return LocalDateTime.ofInstant(Instant.ofEpochSecond(cancelled_at), ZoneId.systemDefault());
        }
    }
}
