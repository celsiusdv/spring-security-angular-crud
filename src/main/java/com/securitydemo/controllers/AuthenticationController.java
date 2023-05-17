package com.securitydemo.controllers;

import com.securitydemo.models.UserEntity;
import com.securitydemo.services.AuthenticationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<UserEntity> registerUser(@RequestBody UserEntity user){
        UserEntity userEntity=authenticationService.registerUser(user.getUsername(), user.getPassword());
        if(userEntity != null ){
            System.out.println(userEntity + " created successfully");
            return new ResponseEntity<>(userEntity,HttpStatus.OK);
        }else{
            System.out.println("user: "+user.getUsername() + " already exist");
            return new ResponseEntity<>(null,HttpStatus.CONFLICT);
        }
    }

    // 1- The client send a request to this endpoint, before the request is completed,it will go to a series of filters, check SecurityConfig.class,
    @PostMapping("/login")
    public ResponseEntity<UserEntity> loginUser(@RequestBody UserEntity user){
        UserEntity userEntity=authenticationService.login(user.getUsername(), user.getPassword());
        if(userEntity != null){//7- finally retrieving the user with a token after the authentication
            System.out.println(userEntity + " logged in successfully");
            return new ResponseEntity<>(userEntity,HttpStatus.OK);
        }else{
            System.out.println(user + " user not found");
            return new ResponseEntity<>(null,HttpStatus.NO_CONTENT);
        }
    }
}











