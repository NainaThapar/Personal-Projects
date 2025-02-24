package com.Project.Naina.Task_manager.repository;

import com.Project.Naina.Task_manager.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByStatus(String status);
    List<Task> findByAssignedToId(Long userId);

}