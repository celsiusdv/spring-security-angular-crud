package com.securitydemo.services;

import com.securitydemo.models.UserEntity;
import com.securitydemo.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

/*service to delete registered users*/
@Slf4j
@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    public List<UserEntity> getAllUsers(){
        return userRepository.findAll();
    }
    public ResponseEntity<String> deleteUser(@PathVariable("id")Integer id){
        Optional<UserEntity> userEntity;
        try{
            userEntity=userRepository.findById(id);
            if(userEntity.get() != null) {
                System.out.println("deleting user...");
                userRepository.deleteUserById(id);
            }
        }catch (NoSuchElementException e ){
            log.error("user not found");
            return new ResponseEntity<>("user not found", HttpStatus.valueOf(404));
        }
        log.info("user deleted successfully");
        return new ResponseEntity<>("user: " +
                userEntity.get().getUsername() + ", deleted successfully", HttpStatus.OK);
    }
}
