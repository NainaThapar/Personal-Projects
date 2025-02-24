package com.Project.Naina.Task_manager.repository;
import com.Project.Naina.Task_manager.model.ActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.time.LocalDateTime;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long>, JpaSpecificationExecutor<ActivityLog> {
    // Custom method to filter by user
    Page<ActivityLog> findByUserId(Long userId, Pageable pageable);

    // Custom method to filter by action type
    Page<ActivityLog> findByAction(String action, Pageable pageable);

    // Custom method to filter by date range
    @Query("SELECT a FROM ActivityLog a WHERE a.timestamp BETWEEN :start AND :end")
    Page<ActivityLog> findByDateRange(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end, Pageable pageable);
}
