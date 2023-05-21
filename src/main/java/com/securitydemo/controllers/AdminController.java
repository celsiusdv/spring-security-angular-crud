package com.securitydemo.controllers;

import com.securitydemo.models.UserEntity;
import com.securitydemo.repository.UserRepository;
import com.securitydemo.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/admin")
    public String showLevel(){
        return "Admin Access Level";
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id")Integer id){
        return adminService.deleteUser(id);
    }
}
