package com.demo.MyApp.config.security;

import com.demo.MyApp.config.security.jwt.JwtAuthenticationEntryPoint;
import com.demo.MyApp.config.security.jwt.JwtTokenProvider;
import com.demo.MyApp.config.security.jwt.JwtAccessDeniedHandler;
import com.demo.MyApp.config.security.jwt.JwtSecurityConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    @Autowired
    private JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable() //서버에 인증정보를 저장하지않음
                .authorizeRequests()
                    .requestMatchers("/api/public/**").permitAll()
                    .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin()
//                    .loginProcessingUrl("/api/login") // 로그인 처리 URL 설정
                    .successHandler((request, response, authentication) -> {
                        // 로그인 성공 시 처리할 로직
                        response.setStatus(200);
                    })
                    .failureHandler((request, response, exception) -> {
                        // 로그인 실패 시 처리할 로직
                        response.setStatus(401);
                    })
                    .permitAll()
                    .and()
                .logout()
                    .logoutUrl("/api/logout")
                    .logoutSuccessHandler((request, response, authentication) -> {
                        // 로그아웃 성공 시 처리할 로직
                        response.setStatus(200);
                    })
                    .permitAll() // 로그아웃은 모든 사용자에게 허용
                    .and()
                .apply(new JwtSecurityConfig(jwtTokenProvider));
        http.cors();
        return http.build();
    }
}
