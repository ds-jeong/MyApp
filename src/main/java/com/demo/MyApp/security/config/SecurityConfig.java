package com.demo.MyApp.security.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UserDetailsService userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                    .requestMatchers("/api/public/**").permitAll()
                    .and()
                .formLogin()
                .loginProcessingUrl("/api/login") // 로그인 처리 URL 설정
                .usernameParameter("userId") // 사용자명 파라미터 이름 설정
                .passwordParameter("pw") // 비밀번호 파라미터 이름 설정
                .successHandler((request, response, authentication) -> {
                    // 로그인 성공 시 처리할 로직
                    response.setStatus(200);
                })
                .failureHandler((request, response, exception) -> {
                    // 로그인 실패 시 처리할 로직
                    response.setStatus(401);
                })
                .permitAll() // 로그인 페이지는 모든 사용자에게 허용
                .and()
                .logout()
                .logoutUrl("/api/logout")
                .logoutSuccessHandler((request, response, authentication) -> {
                    // 로그아웃 성공 시 처리할 로직
                    response.setStatus(200);
                })
                .permitAll() // 로그아웃은 모든 사용자에게 허용
                .and()
                .csrf().disable(); // CSRF 비활성화
        return http.build();
    }
}
