package com.securitydemo.services;

import com.securitydemo.jwt.TokenGenerator;
import com.securitydemo.models.Role;
import com.securitydemo.models.UserEntity;
import com.securitydemo.repository.RoleRepository;
import com.securitydemo.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;


@Service
public class AuthenticationService {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenGenerator tokenService;



    public UserEntity registerUser(String username, String password) {
        Role userRole = roleRepository.findByRoleName("USER").get();//retrieve roles from DB
        Optional<UserEntity> user = userRepository.findByUsername(username);//retrieve user from DB
        if (user.isPresent()) return null;
        else {
            Set<Role> authorities = new HashSet<>();
            authorities.add(userRole);
            UserEntity userEntity = new UserEntity(username, passwordEncoder.encode(password), authorities);
            return userRepository.save(userEntity);
        }
    }
    //3- authenticate the user
    public UserEntity login(String username, String password){
        UserEntity user=null;
        try {
            Authentication auth =//Authenticate the user for the ProviderManager in SecurityConfig.class, @Bean AuthenticationManager
                    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            if(auth.isAuthenticated()){
                String token = tokenService.generateJwt(auth);
                user=userRepository.findByUsername(username).get();
                user.setToken(token);//this entity will have a token but will not persist the token in the database
            }
        }catch (AuthenticationException e) {
            e.getMessage();
            return null;
        }
        return user;
    }
}
