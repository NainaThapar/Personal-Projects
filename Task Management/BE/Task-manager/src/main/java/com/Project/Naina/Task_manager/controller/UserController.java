package com.Project.Naina.Task_manager.controller;
import com.Project.Naina.Task_manager.repository.UserRepository;
import com.Project.Naina.Task_manager.model.UserDTO;
import com.Project.Naina.Task_manager.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/manage")
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> new UserDTO(user.getId(), user.getUsername(), user.getRole()))
                .collect(Collectors.toList());
    }
}