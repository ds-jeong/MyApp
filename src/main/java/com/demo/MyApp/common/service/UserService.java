package com.demo.MyApp.common.service;

import com.demo.MyApp.common.dto.UserDto;

public interface UserService {
    void registerUser(UserDto userDto) throws Exception;

    boolean isUsernameExists(String userNm) throws Exception;

    boolean isPhoneExists(String phone) throws Exception;

    boolean isEmailExists(String phone) throws Exception;

    UserDto selectUserInfo(UserDto userDto);

    UserDto selectUserInfoByEmail(String email);
}
