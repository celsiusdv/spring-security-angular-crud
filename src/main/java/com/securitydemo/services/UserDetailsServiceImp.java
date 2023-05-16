package com.securitydemo.services;

import com.securitydemo.models.UserEntity;
import com.securitydemo.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class UserDetailsServiceImp implements UserDetailsService {
    @Autowired
     private UserRepository userRepository;

    // 5- fetch user through the @Bean AuthenticationManager from SecurityConfig.class
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user=userRepository.findByUsername(username)
                .orElseThrow(()->new UsernameNotFoundException("invalid user"));
        return user;//return a user that implements the interface UserDetails
    }
}
