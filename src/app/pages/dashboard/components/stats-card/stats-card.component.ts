import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [NgIf, MatIconModule],
  templateUrl: './stats-card.component.html',
  styleUrl: './stats-card.component.scss'
})
export class StatsCardComponent {
  @Input() icon = '';
  @Input() materialIcon = false;
  @Input() title = '';
  @Input() value = '';
  @Input() change = '';
  get isUp() {
    return this.change.startsWith('+');
  }
}
