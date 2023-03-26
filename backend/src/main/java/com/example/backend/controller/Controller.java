package com.example.backend.controller;

import com.example.backend.WebSocketConfig;
import com.example.backend.dto.productdto;
import com.example.backend.dto.userdto;
import com.example.backend.model.Product;
import com.example.backend.model.User;
import com.example.backend.service.ProductService;
import com.example.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class Controller {

    private final UserService userService;
    private final ProductService productService;
    private final RedisTemplate<String, String> redisTemplate;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    public Controller(UserService userService, ProductService productService, RedisTemplate<String, String> redisTemplate, WebSocketConfig webSocketConfig) {
        this.userService = userService;
        this.productService = productService;
        this.redisTemplate = redisTemplate;

    }


    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody userdto users, HttpServletRequest request) {

        if (userService.checkusername(users.getUsername())) {
            return ResponseEntity.badRequest().body("username already taken");
        }
        User user = userService.createuser(users);

        // create a new session and get its ID
        HttpSession session = request.getSession();
        String sessionId = session.getId();

        // save the session ID to Redis for the new user
        redisTemplate.opsForValue().set(sessionId, user.getUsername());

        return ResponseEntity.ok("regisration succes "+user.getUsername());
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginuser(@RequestBody userdto users, HttpServletRequest request) {

        User user = userService.getUserByUsername(users.getUsername());

        if (user != null && user.getPassword().equals(users.getPassword())) {

            // create a new session and get its ID
            HttpSession session = request.getSession();
            String sessionId = session.getId();

            // save the session ID to Redis for the new user
            redisTemplate.opsForValue().set(sessionId, users.getUsername());

            return ResponseEntity.ok("login succes "+users.getUsername() +"cookie: "+sessionId);
        }
        return ResponseEntity.badRequest().body("wrong");
    }

    @GetMapping("/getproducts")
    public ResponseEntity<List> getproducts(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String sessionId = session.getId();
        String username = redisTemplate.opsForValue().get(sessionId);
        if (username == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(productService.getProducts());
    }



    @PostMapping("/updateproducts")
    public ResponseEntity<Product> updateproducts(@RequestBody productdto productdto, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String sessionId = session.getId();
        String username = redisTemplate.opsForValue().get(sessionId);
        if (username == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Product a= productService.updateproducts(productdto);
        messagingTemplate.convertAndSend("/topic/products", productService.getProductNewPrices());
        return ResponseEntity.ok(a);
    }

}