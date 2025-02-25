import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RelativeTimePipe } from '../../relative-time.pipe';

@Component({
  selector: 'app-activity-card',
  imports: [MatIcon, RelativeTimePipe],
  templateUrl: './activity-card.component.html',
  styleUrl: './activity-card.component.css'
})
export class ActivityCardComponent {
  @Input() action: string = '';
  @Input() timestamp: any ;
  @Input() details: string = '';
  @Input() user: any;
}
