package com.securitydemo.controllers;

import com.securitydemo.models.UserEntity;
import com.securitydemo.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;


    @GetMapping("/users")
    public List<UserEntity> getUsers(){return adminService.getAllUsers();}

    @DeleteMapping("/user/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id")Integer id){
        return adminService.deleteUser(id);
    }
}
