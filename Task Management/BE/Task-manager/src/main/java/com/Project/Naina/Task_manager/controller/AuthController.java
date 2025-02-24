package com.Project.Naina.Task_manager.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import com.Project.Naina.Task_manager.repository.UserRepository;
import com.Project.Naina.Task_manager.model.User;
import com.Project.Naina.Task_manager.model.LoginRequest;
import com.Project.Naina.Task_manager.model.Role;
import java.util.Map;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200") // Allow Angular frontend to access backend
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Username already exists!"));
        }

        if (user.getRole() == null) {
            user.setRole(Role.USER); // Default role
        }

        user.setPassword(passwordEncoder.encode(user.getPassword())); // Hash the password
        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "User registered successfully!"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElse(null);

        if (user == null || !passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }

        return ResponseEntity.ok(user); // Normally, you would return a JWT token instead
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpServletRequest request, HttpServletResponse response) {
        request.getSession().invalidate(); // Invalidate session if using session-based auth
        return ResponseEntity.ok(Map.of("message", "Logged out successfully!"));
    }

}

