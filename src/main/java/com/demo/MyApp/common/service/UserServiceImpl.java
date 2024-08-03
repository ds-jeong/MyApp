package com.demo.MyApp.common.service;

import com.demo.MyApp.admin.product.entity.Product;
import com.demo.MyApp.common.dto.UserDto;
import com.demo.MyApp.common.entity.User;
import com.demo.MyApp.common.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor //생성자 주입코드없이 의존성주입
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // 패스워드 암호화를 위한 빈

    @Override
    public void registerUser(UserDto userDto) throws Exception {
        // 패스워드 암호화
        String encodedPassword = passwordEncoder.encode(userDto.getPw());
        userDto.setPw(encodedPassword);
        // 기타 필요한 로직 처리 (예: 역할 설정, 기본값 등)
        userDto.setRole("user"); // 기본적으로 일반 사용자 역할 할당

        // DTO를 Entity로 변환하여 save() 메소드에 담아 데이터 삽입
        User user = User.toEntity(userDto);
        userRepository.save(user);
    }

    @Override
    public boolean isUsernameExists(String userNm) throws Exception {
        return userRepository.findByUserNm(userNm) != null;
    }

    @Override
    public List<UserDto> getUserInfo(UserDto userDto) throws Exception {
        return List.of();
    }
}
