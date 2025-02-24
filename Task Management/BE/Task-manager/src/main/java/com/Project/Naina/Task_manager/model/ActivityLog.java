package com.Project.Naina.Task_manager.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Entity
@Table(name = "activity_log")
public class ActivityLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
     private User user;

      private String action; // CREATE, UPDATE, DELETE

     private String taskName;

      private LocalDateTime timestamp;

      private String details; // JSON of old/new values for updates

    public void setUser(User user){
        this.user = user;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public Long getId() { return id; }
    public User getUser() {return user;}
    public String getAction() {return action;}
    public String getTaskName() {return taskName;}

    public LocalDateTime getTimestamp() {
        return timestamp;
    }
    public String getDetails() { return details;}
}
