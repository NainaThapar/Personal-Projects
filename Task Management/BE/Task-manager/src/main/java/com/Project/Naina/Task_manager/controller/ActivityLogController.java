package com.Project.Naina.Task_manager.controller;
import com.Project.Naina.Task_manager.model.ActivityLog;
import com.Project.Naina.Task_manager.service.ActivityLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class ActivityLogController {

    @Autowired
    private ActivityLogService service;

    @GetMapping("/admin/activity-logs")
    public ResponseEntity<Page<ActivityLog>> getLogs(
            @RequestParam(required = false) String userId,
            @RequestParam(required = false) String action,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end,

            Pageable pageable) {
        System.out.println(userId + action);
        Long parsedUserId = (userId == null || userId.equals("undefined") || userId.isEmpty()) ? null : Long.parseLong(userId);
        return ResponseEntity.ok(service.getLogs(parsedUserId, action, start, end, pageable));
    }

    @GetMapping("/user/activity/{userId}")
    public ResponseEntity<Page<ActivityLog>> getLogsByUser(
            @PathVariable Long userId,
            Pageable pageable) {
        return ResponseEntity.ok(service.getLogs(userId, null, null, null, pageable));
    }
}
