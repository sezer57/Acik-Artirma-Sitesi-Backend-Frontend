package com.example.backend.service;

import com.example.backend.dto.userdto;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public User createuser(userdto userr){
        User user = new User(userr.getUsername(), userr.getPassword());
        return userRepository.save(user);
    }
    public boolean checkusername(String name){
        return userRepository.existsByUsername(name);
    }
    public User getUserByUsername(String name){
        return userRepository.findByUsername(name);
    }
}




