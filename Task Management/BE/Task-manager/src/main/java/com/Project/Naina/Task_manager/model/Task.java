package com.Project.Naina.Task_manager.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter private Long id;

     private String title;
    private String description;
     private String status; // "To Do", "In Progress", "Done"
    @Getter @Setter private String priority;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @Getter @Setter private User assignedTo;

    @Getter @Setter
    @Temporal(TemporalType.DATE)
    @Column(name = "due_date")
    private Date dueDate;

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public void setAssignedTo(User assignedTo){
        this.assignedTo = assignedTo;
    }

    public void setDueDate(Date dueDate){
        this.dueDate = dueDate;
    }

    public Long getId() { return id; }

    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getStatus() { return status; }
    public String getPriority() { return priority; }
    public User getAssignedTo() { return assignedTo; }
    public Date getDueDate() { return dueDate; }
}