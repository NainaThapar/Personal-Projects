import { Component, OnInit } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from "@angular/common";
import { TaskModalComponent } from "../task-modal/task-modal.component";
import { MatDialog } from '@angular/material/dialog';
import { UserService } from "../../services/user.service";

import { TaskService } from "../../services/task.service";

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrl: './tasks.component.css',
    standalone: true,
    imports: [FormsModule, MatInputModule, MatFormFieldModule, CommonModule, TaskModalComponent]
  })
  export class TasksComponent {
    constructor(private taskService: TaskService, private dialog: MatDialog, private userService: UserService) {}
    task = { title: '', description: '', status: 'To Do', priority: 'Low', assignedTo: null, dueDate: null };
    users: any = [];

    ngOnInit() {
      this.userService.getAllUsers().subscribe(res => {
          this.users = res
          console.log(this.users)
      });
      
  }



     createTask = () => {
        console.log("Great! You've successfully created your TASK!!")
    }


    addTask() {
        if(this.task.title !== '' && this.task.description !== ''){
            this.taskService.createTask(this.task).subscribe(response => {
                console.log('Task Created:', response);
                alert('Task added successfully!');
              }, error => {
                console.error('Error adding task:', error);
              });
            }
            else{
                alert('Please fill all the required fields!');
            }
        }

        openTaskModal(): void {
          const dialogRef = this.dialog.open(TaskModalComponent, {
            width: '500px',
            data: { /* You can pass data here if needed */ }
          });
      
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            // Handle any data returned from the modal here
          });
        }
        
    }