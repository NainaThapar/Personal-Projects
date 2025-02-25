import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskService } from '../../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { NoDataComponent } from '../no-data/no-data.component';

@Component({
  selector: 'app-task-management',
  imports: [MatIconModule, MatButtonModule, TaskCardComponent, TaskModalComponent, CommonModule, NoDataComponent],
  templateUrl: './task-management.component.html',
  styleUrl: './task-management.component.css'
})
export class TaskManagementComponent {
  constructor(private taskService: TaskService, public dialog: MatDialog, private authService: AuthService) {}

  tasks: any = [];
  progress: any = [];
  todo: any = [];
  done: any = [];
  progressCount: number = 0;
  todoCount: number = 0;
  doneCount: number = 0;
  user: any = {}

  ngOnInit() {
    let apiCall$;
    this.user = this.authService.getUserSession();
    console.log(this.user)
    if(this.user?.role === 'ADMIN'){
      apiCall$ = this.taskService.getAllTasks();
    }
    else {
      apiCall$ = this.taskService.getUserTasks(this.user?.id);
    }

    apiCall$.subscribe((data: any) => {
      this.processTasks(data);
    })
    
}

processTasks(data: any) {
  this.tasks = data;
  this.progress = this.tasks.filter((task: any) => task.status.toLowerCase() === 'in progress');
         this.todo = this.tasks.filter((task: any) => task.status.toLowerCase() === 'to do');
        this.done = this.tasks.filter((task: any) => task.status.toLowerCase() === 'done');
        this.progressCount = this.progress.length;
        this.todoCount = this.todo.length;
        this.doneCount = this.done.length;
}

openTaskModal(task: any): void {
  console.log(task);
  const dialogRef = this.dialog.open(TaskModalComponent, {
    width: '500px',
    data: task
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed', result);
    // Handle any data returned from the modal here
  });
}

}
