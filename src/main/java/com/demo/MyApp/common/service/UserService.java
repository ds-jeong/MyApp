package com.demo.MyApp.common.service;

import com.demo.MyApp.common.dto.UserDto;

public interface UserService {
    void registerUser(UserDto userDto) throws Exception;

    boolean isUsernameExists(String userNm) throws Exception;

    UserDto selectUserInfo(UserDto userDto);
}
