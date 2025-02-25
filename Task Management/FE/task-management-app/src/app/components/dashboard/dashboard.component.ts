import { Component, OnInit } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { OverviewCardComponent } from "../overview-card/overview-card.component";
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from "@angular/common";
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoDataComponent } from "../no-data/no-data.component";


import { TaskService } from "../../services/task.service";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [FormsModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, OverviewCardComponent, MatSelectModule, MatOptionModule, CommonModule, MatTableModule, MatSortModule, MatPaginatorModule, NoDataComponent]
  })
  export class DashboardComponent {
    tasks: any[] = [];
    cards: any[] = [];
    // cards = [{title: "Total Tasks", count: this.tasks.length}, {title: "To Do", count: 8}, {title: "In Progress", count: 12}, {title: "Completed", count: 4}];
    searchText: string = "";
    selectedStatusFilter: string = '';
    selectedPriorityFilter: string = '';
    filterStatusOptions: string[] = ['To do', 'In progress', 'Done']
    filterPriorityOptions: string[] = ['Low', 'Medium', 'High'];

    filters: { [key: string]: string } = {};
  displayedColumns: string[] = ['title', 'assignedTo', 'status', 'priority', 'dueDate', 'actions'];
  dataSource = [
    { task: 'John', a_user: 28, status: 'To Do', priority: 'High', dueDate: 'Mar 15, 2025', actions: 'act' },
    { task: 'John', a_user: 28, status: 'Completed', priority: 'Low', dueDate: 'Mar 15, 2025', actions: 'act' },
    { task: 'John', a_user: 28, status: 'In Progress', priority: 'Medium', dueDate: 'Mar 15, 2025', actions: 'act' },
    { task: 'John', a_user: 28, status: 'Completed', priority: 'Low', dueDate: 'Mar 15, 2025', actions: 'act' }
  ];

  filteredData = [...this.tasks];

  filterTasks(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredData = this.tasks.filter(task => task.title.toLowerCase().includes(searchTerm));
  }

  onFilterChange(event: any, field: string ) {
    console.log(`Filter applied: ${field} = ${event.value}`);

    // Update filter object
    if (event.value) {
      this.filters[field] = event.value.toLowerCase();
    } else {
      delete this.filters[field]; // Remove filter if empty
    }
  
    // Apply all filters
    this.filteredData = this.tasks.filter(task =>
      Object.keys(this.filters).every(key => 
        task[key]?.toLowerCase() === this.filters[key]
      )
    );
    this.processTasks(this.filteredData);
  }

  onPriorityFilterChange(event: any, field: string ) {
    console.log('Selected Filter:', event.value);
    if(!event.value){
      this.filteredData = [...this.tasks];
    }
    else{

    this.filteredData = this.tasks.filter(task => task[field]?.toLowerCase() === event.value.toLowerCase() );
    }
  }

//   onFilterChange(event: any): void {
//     if (event.value) {
//       this.filteredData = this.dataSource.filter(item =>
//         item[event.value.toLowerCase()].toString().toLowerCase().includes('')
//       );
//     } else {
//       this.filteredData = [...this.dataSource];
//     }
//   }
// }

    constructor(private taskService: TaskService, public dialog: MatDialog, private authService: AuthService) {}

    ngOnInit() {
      let apiCall$;
      const user = this.authService.getUserSession();
      console.log(user)
      if(user?.role === 'ADMIN'){
        apiCall$ = this.taskService.getAllTasks();
      }
      else {
        apiCall$ = this.taskService.getUserTasks(user?.id);
      }
  
      apiCall$.subscribe((data: any) => {
        this.tasks = data;
        this.processTasks(data);
      })
    }

    processTasks(data: any) {
      this.filteredData = data;
            const progress = data.filter((task : any) => task.status.toLowerCase() === 'in progress');
            const todo = data.filter((task : any) => task.status.toLowerCase() === 'to do');
            const done = data.filter((task : any) => task.status.toLowerCase() === 'done');
            
            this.cards = [{title: "Total Tasks", count: data.length}, {title: "To Do", count: todo.length}, {title: "In Progress", count: progress.length}, {title: "Completed", count: done.length}];
            console.log(this.tasks)
    }

    // openTaskModal(task: any ) {
    //     this.dialog.open(TaskModalComponent, {
    //       width: '400px', 
    //       data: task
    //     });
    //   }

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

      deleteTask(id: number){
        this.taskService.deleteTask(id).subscribe(response => {
            this.tasks = [...this.tasks.filter(task =>  task.id !== id)];
            this.filteredData = this.tasks;
            console.log(this.tasks);
            console.log("Task Deleted: ", response);
            alert("Task deleted successfully!");
        }, error => {
            console.error('error deleting the task', error);
        })
      }

      getStatusClass(status: string) : string {
        switch (status.toLowerCase()) {
          case 'to do':
            return 'status-todo';
          case 'in progress':
            return 'status-progress';
          case 'done':
            return 'status-completed';
          default:
            return '';
        }
      }

      getPriorityClass(priority: string): string {
        switch(priority.toLowerCase()){
          case 'low':
            return 'status-low';
          case 'medium':
            return 'status-medium';
          case 'high':
            return 'status-high';
          default:
            return '';
        }
      }
    
  }