package com.demo.MyApp.config.security;

import com.demo.MyApp.config.security.jwt.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;


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
                .csrf(csrf -> csrf.disable()) // CSRF 비활성화
                .authorizeRequests(authz -> authz
                        .anyRequest().permitAll() // 공개 API는 인증 없이 접근 가능
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션을 사용하지 않음
                )
                .formLogin(formLogin -> formLogin
                        .successHandler((request, response, authentication) -> {
                            response.setStatus(200); // 로그인 성공 시 상태 코드 200
                        })
                        .failureHandler((request, response, exception) -> {
                            response.setStatus(401); // 로그인 실패 시 상태 코드 401
                        })
                        .permitAll() // 로그인 페이지는 모든 사용자에게 허용
                )
                .logout(logout -> logout
                        .logoutUrl("/api/logout") // 로그아웃 URL 설정
                        .logoutSuccessHandler((request, response, authentication) -> {
                            response.setStatus(200); // 로그아웃 성공 시 상태 코드 200
                        })
                        .permitAll() // 로그아웃은 모든 사용자에게 허용
                )
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // CORS 설정
                .addFilterBefore(new JwtFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);// JWT 설정 적용
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.addAllowedMethod("*"); // 모든 HTTP 메소드 허용
        configuration.addAllowedHeader("*"); // 모든 헤더 허용
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .csrf().disable() //서버에 인증정보를 저장하지않음
//                .authorizeRequests()
//                    .requestMatchers("/api/public/**").permitAll()
//                    .and()
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                .and()
//                .formLogin()
////                    .loginProcessingUrl("/api/login") // 로그인 처리 URL 설정
//                    .successHandler((request, response, authentication) -> {
//                        // 로그인 성공 시 처리할 로직
//                        response.setStatus(200);
//                    })
//                    .failureHandler((request, response, exception) -> {
//                        // 로그인 실패 시 처리할 로직
//                        response.setStatus(401);
//                    })
//                    .permitAll()
//                    .and()
//                .logout()
//                    .logoutUrl("/api/logout")
//                    .logoutSuccessHandler((request, response, authentication) -> {
//                        // 로그아웃 성공 시 처리할 로직
//                        response.setStatus(200);
//                    })
//                    .permitAll() // 로그아웃은 모든 사용자에게 허용
//                    .and()
//                .apply(new JwtSecurityConfig(jwtTokenProvider));
//        http.cors();
//        return http.build();
//    }
}
