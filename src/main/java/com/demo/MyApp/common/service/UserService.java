package com.demo.MyApp.common.service;

import com.demo.MyApp.common.dto.UserDto;

import java.util.List;

public interface UserService {
    void registerUser(UserDto userDto) throws Exception;

    boolean isUsernameExists(String userNm) throws Exception;

    List<UserDto> getUserInfo(UserDto userDto) throws Exception;
}
