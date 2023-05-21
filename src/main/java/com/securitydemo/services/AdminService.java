package com.securitydemo.services;

import com.securitydemo.models.UserEntity;
import com.securitydemo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<String> deleteUser(@PathVariable("id")Integer id){
        Optional<UserEntity> userEntity;
        try{
            userEntity=userRepository.findById(id);
            if(userEntity.get() != null) {
                System.out.println("deleting user...");
                userRepository.deleteUserById(id);
            }
        }catch (NoSuchElementException e ){
            return new ResponseEntity<>("user not found", HttpStatus.valueOf(404));
        }
        return new ResponseEntity<>("user: " +
                userEntity.get().getUsername() + ", deleted successfully", HttpStatus.OK);
    }
}
