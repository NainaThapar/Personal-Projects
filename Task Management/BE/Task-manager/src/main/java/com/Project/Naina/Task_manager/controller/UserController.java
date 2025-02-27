package com.Project.Naina.Task_manager.controller;
import com.Project.Naina.Task_manager.repository.UserRepository;
import com.Project.Naina.Task_manager.model.UserDTO;
import com.Project.Naina.Task_manager.model.UpdateRoleDTO;
import com.Project.Naina.Task_manager.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;
import org.springframework.http.HttpStatus;

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

    @PutMapping("/update-role/{id}")
    public ResponseEntity<UserDTO> updateRole(@PathVariable Long id, @RequestBody UpdateRoleDTO updateRoleDTO) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User user = optionalUser.get();
        user.setRole(updateRoleDTO.getRole()); // Updating the role
        userRepository.save(user); // Save to database

        UserDTO updatedUserDTO = new UserDTO(user.getId(), user.getUsername(), user.getRole());
        return ResponseEntity.ok(updatedUserDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        userRepository.deleteById(id);
        return ResponseEntity.ok("User deleted successfully");
    }
}