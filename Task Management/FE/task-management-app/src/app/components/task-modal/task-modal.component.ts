import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from "../../services/task.service";
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { ChangeDetectorRef } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatOptgroup } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS, MatNativeDateModule, MAT_DATE_LOCALE, DateAdapter, NativeDateAdapter } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  provide: MAT_DATE_FORMATS,
  useValue: {
    display: {
      dateInput: { month: 'short', day: 'numeric', year: 'numeric' },
      dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    },
    parse: { dateInput: 'YYYY-MM-DD' },
  }
};
@Component({
  selector: 'app-task-modal',
  imports: [MatDialogModule, FormsModule, MatFormFieldModule, CommonModule, MatButton, MatSelect, MatOptgroup, MatOption, MatOptionModule, MatInputModule, MatInput, MatSelectModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.css',
  providers: [ 
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: DateAdapter, useClass: NativeDateAdapter },
    MY_DATE_FORMATS]
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
    this.originalTask = { ...data.task };  // Store a copy of the original task data
    this.task = { ...this.originalTask };  // Bind to a separate task object for form
    console.log(this.task, 'modal');
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
    this.data.task = { ...this.originalTask };
    this.cdr.detectChanges();  // Trigger change detection to update the UI
    this.dialogRef.close();    // Close the modal without saving
  }
}
