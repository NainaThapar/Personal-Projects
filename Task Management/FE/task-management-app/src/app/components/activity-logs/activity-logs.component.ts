import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivityCardComponent } from '../activity-card/activity-card.component';
import { ActivityLogsService } from '../../services/activity-logs.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activity-logs',
  imports: [MatIcon, ActivityCardComponent, CommonModule],
  templateUrl: './activity-logs.component.html',
  styleUrl: './activity-logs.component.css'
})
export class ActivityLogsComponent {

  constructor(private activityLogsService: ActivityLogsService, private authService: AuthService){}

  data: any = [];


  ngOnInit() {
    const user = this.authService.getUserSession();
    console.log(user);
    if(user?.role === 'ADMIN'){
      this.activityLogsService.getActivityLogs().subscribe((res: any) => {
        this.data = res.content;
      })
    }
    else {
      this.activityLogsService.getUserActivity(user?.id).subscribe((res: any) => {
        this.data = res.content;
        console.log(this.data)
      })
    }
  }
}
