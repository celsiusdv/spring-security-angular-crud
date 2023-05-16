package com.securitydemo.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/user")
    public String showLevel(){
        return "User Access Level";
    }
    @GetMapping("/all")
    public String showLevelForAll(){
        return "User or Admin Access Level";
    }
}
