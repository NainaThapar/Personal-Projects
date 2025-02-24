package com.Project.Naina.Task_manager.controller;

import com.Project.Naina.Task_manager.model.Task;
import com.Project.Naina.Task_manager.model.UserDTO;
import  com.Project.Naina.Task_manager.repository.TaskRepository;
import com.Project.Naina.Task_manager.model.User;
import  com.Project.Naina.Task_manager.repository.UserRepository;
import com.Project.Naina.Task_manager.service.ActivityLogService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ActivityLogService activityLogService;

    @GetMapping("/admin/tasks")
    public List<Map<String, Object>> getAllTasks() {
        return taskRepository.findAll().stream().map(task -> {
            Map<String, Object> taskMap = new HashMap<>();
            taskMap.put("id", task.getId());
            taskMap.put("title", task.getTitle());
            taskMap.put("description", task.getDescription());
            taskMap.put("status", task.getStatus());
            taskMap.put("priority", task.getPriority());
            taskMap.put("dueDate", task.getDueDate());
            User assignedUser = task.getAssignedTo();
            if (assignedUser != null) {
                UserDTO userDTO = new UserDTO(assignedUser.getId(), assignedUser.getUsername(), assignedUser.getRole());
                taskMap.put("assignedTo", userDTO);
            }
            return taskMap;
        }).collect(Collectors.toList());
    }

    @GetMapping("/user/tasks/{userId}")
    public List<Map<String, Object>> getTasksByUserId(@PathVariable Long userId) {
        return taskRepository.findByAssignedToId(userId).stream().map(task -> {
            Map<String, Object> taskMap = new HashMap<>();
            taskMap.put("id", task.getId());
            taskMap.put("title", task.getTitle());
            taskMap.put("description", task.getDescription());
            taskMap.put("status", task.getStatus());
            taskMap.put("priority", task.getPriority());
            taskMap.put("dueDate", task.getDueDate());

            User assignedUser = task.getAssignedTo();
            if (assignedUser != null) {
                UserDTO userDTO = new UserDTO(assignedUser.getId(), assignedUser.getUsername(), assignedUser.getRole());
                taskMap.put("assignedTo", userDTO);
            }
            return taskMap;
        }).collect(Collectors.toList());
    }

@PostMapping
public ResponseEntity<Task> createTask(@RequestBody Task task) {
    User assignedUser = userRepository.findById(task.getAssignedTo().getId())
            .orElseThrow(() -> new RuntimeException("User not found"));

    task.setAssignedTo(assignedUser);

    Task savedTask = taskRepository.save(task);
    activityLogService.logAction(assignedUser, "Created Task", savedTask, "Task created with title: " + savedTask.getTitle());
    return ResponseEntity.status(HttpStatus.CREATED).body(savedTask);
}

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        Task task = taskRepository.findById(id).orElseThrow();
        Map<String, String> changes = new HashMap<>();

        if (!task.getTitle().equals(taskDetails.getTitle())) {
            changes.put("Title", "from '" + task.getTitle() + "' to '" + taskDetails.getTitle() + "'");
            task.setTitle(taskDetails.getTitle());
        }
        if (!task.getDescription().equals(taskDetails.getDescription())) {
            changes.put("Description", "from '" + task.getDescription() + "' to '" + taskDetails.getDescription() + "'");
            task.setDescription(taskDetails.getDescription());
        }
        if (!task.getStatus().equals(taskDetails.getStatus())) {
            changes.put("Status", "from '" + task.getStatus() + "' to '" + taskDetails.getStatus() + "'");
            task.setStatus(taskDetails.getStatus());
        }
        if (!task.getPriority().equals(taskDetails.getPriority())) {
            changes.put("Priority", "from '" + task.getPriority() + "' to '" + taskDetails.getPriority() + "'");
            task.setPriority(taskDetails.getPriority());
        }
        if (!task.getAssignedTo().equals(taskDetails.getAssignedTo())) {
            changes.put("Assigned To", "from '" + task.getAssignedTo().getUsername() + "' to '" + taskDetails.getAssignedTo().getUsername() + "'");
            task.setAssignedTo(taskDetails.getAssignedTo());
        }
        if (!task.getDueDate().equals(taskDetails.getDueDate())) {
            changes.put("Due Date", "from '" + task.getDueDate() + "' to '" + taskDetails.getDueDate() + "'");
            task.setDueDate(taskDetails.getDueDate());
        }

        Task updatedTask = taskRepository.save(task);

        StringBuilder logDetails = new StringBuilder("Updated fields: ");
        changes.forEach((field, change) -> logDetails.append(field).append(" ").append(change).append("; "));

        activityLogService.logAction(task.getAssignedTo(), "Updated Task", updatedTask, logDetails.toString());
        return updatedTask;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteTask(@PathVariable Long id) {
        Task task = taskRepository.findById(id).orElseThrow();

        taskRepository.deleteById(id);
        activityLogService.logAction(task.getAssignedTo(), "Deleted Task", task, "Task with title '" + task.getTitle() + "' deleted");
        Map<String, String> response = new HashMap<>();
        response.put("message", "Task deleted successfully");
        return ResponseEntity.ok(response);
    }
}
