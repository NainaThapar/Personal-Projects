package com.Project.Naina.Task_manager.service;

import com.Project.Naina.Task_manager.model.ActivityLog;
import com.Project.Naina.Task_manager.repository.ActivityLogRepository;
import com.Project.Naina.Task_manager.model.User;
import com.Project.Naina.Task_manager.model.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class ActivityLogService {

    @Autowired
    private ActivityLogRepository repository;

    public Page<ActivityLog> getLogs(Long userId, String action, LocalDateTime start, LocalDateTime end, Pageable pageable) {
        Specification<ActivityLog> spec = (root, query, cb) -> cb.conjunction();

        if (userId != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("user").get("id"), userId));
        }
        if (action != null) {
            spec = spec.and((root, query, cb) -> cb.like(cb.lower(root.get("action")), "%" + action.toLowerCase() + "%"));
        }
        if (start != null && end != null) {
            spec = spec.and((root, query, cb) -> cb.between(root.get("timestamp"), start, end));
        }

        return repository.findAll(spec, pageable);
    }

    public void logAction(User user, String action, Task task, String details) {
        ActivityLog log = new ActivityLog();
        log.setUser(user);
        log.setAction(action);
        log.setTaskName(task.getTitle());
        log.setTimestamp(LocalDateTime.now());
        log.setDetails(details);
        repository.save(log);
    }
}

