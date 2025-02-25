import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-overview-card',
  imports: [],
  templateUrl: './overview-card.component.html',
  styleUrl: './overview-card.component.css'
})
export class OverviewCardComponent {
  @Input() title !: string;
  @Input() count !: number;

}
