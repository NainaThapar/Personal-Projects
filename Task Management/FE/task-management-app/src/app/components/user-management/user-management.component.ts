import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from "@angular/common";
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-management',
  imports: [MatIconModule, MatButtonModule, CommonModule, MatTableModule, MatSortModule, MatPaginatorModule, MatSelectModule, MatOptionModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {
constructor(private userService: UserService){};

users: any = [];
displayedColumns: string[] = ['id', 'name', 'role', 'actions'];

  ngOnInit() {
    this.userService.getAllUsers().subscribe((res: any) => {
      this.users = res;
      console.log(this.users);
    });
  }

  roles = ['ADMIN', 'USER'];
  editedRowId: number | null = null;
  editedRole: string = '';

  editRow(user: any) {
    this.editedRowId = user.id;
    this.editedRole = user.role; // Set default value
  }

  saveRole(user: any) {
    user.role = this.editedRole;
    this.editedRowId = null; // Exit edit mode
  }

  cancelEdit() {
    this.editedRowId = null; // Exit edit mode without saving
  }

  deleteUser(user: any) {
    this.users = this.users.filter((u: any) => u.id !== user.id);
  }

}
