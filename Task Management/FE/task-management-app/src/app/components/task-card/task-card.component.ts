import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-card',
  imports: [MatIconModule, CommonModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {


  @Input() title: string = '';
  @Input() user: string = '';
  @Input() priority: string = '';
  @Input() dueDate: any;
}
