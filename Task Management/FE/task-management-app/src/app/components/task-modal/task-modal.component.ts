import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from "../../services/task.service";
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-task-modal',
  imports: [MatDialogModule, FormsModule, MatFormFieldModule, CommonModule],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.css'
})
export class TaskModalComponent {
  originalTask: any;
  task: any;
  users: any = [];

  constructor(
    public dialogRef: MatDialogRef<TaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {
    this.originalTask = { ...data };  // Store a copy of the original task data
    this.task = { ...this.originalTask };  // Bind to a separate task object for form
    console.log(this.task);
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(res => {
      this.users = res;
      console.log(this.users);
    });
  }

  saveTask() {
    if (this.task.title !== '' && this.task.description !== '') {
      if(this.task?.id){
        this.taskService.updateTask(this.task.id, this.task).subscribe((response: any) => {
          console.log('Task Updated:', response);
          alert('Task updated successfully!');
        }, error => {
          console.error('Error updating task:', error);
        });
      }
      else {
        this.taskService.createTask(this.task).subscribe((response: any) => {
          console.log('Task Created:', response);
          alert('Task added successfully!');
        }, error => {
          console.error('Error adding task:', error);
        });
      }
      
      this.dialogRef.close(this.task);  // Close modal after saving
    } else {
      alert('Please fill all the required fields!');
    }
  }

  cancel() {
    // Revert to original task data and close the modal
    this.data = { ...this.originalTask };
    this.cdr.detectChanges();  // Trigger change detection to update the UI
    this.dialogRef.close();    // Close the modal without saving
  }
}
