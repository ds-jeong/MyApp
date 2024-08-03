package com.demo.MyApp.config.security;

import com.demo.MyApp.common.entity.User;
import com.demo.MyApp.common.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserId(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with userId: " + username);
        }
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getUserId())
                .password(user.getPw())
                .roles(user.getRole())
                .build();
    }
}
