import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // React 개발 서버의 주소
//                .allowedOrigins("http://3.106.69.213:3000") // React 개발 서버의 주소
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("Authorization", "Content-Type", "Origin") // 클라이언트 측의 CORS 요청에 허용되는 헤더를 지정
                .exposedHeaders("Custom-Header") // 클라이언트측 응답에서 노출되는 헤더를 지정
                .allowCredentials(true); // 클라이언트 측에 대한 응답에 credentials(예: 쿠키, 인증 헤더)를 포함할 수 있는지 여부를 지정
    }
}