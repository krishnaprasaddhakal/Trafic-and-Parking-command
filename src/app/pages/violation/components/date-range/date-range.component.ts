import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-range',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './date-range.component.html',
  styleUrl: './date-range.component.scss'
})
export class DateRangeComponent {
  @Input() start = '';
  @Input() end = '';
  @Output() change = new EventEmitter<{start: string, end: string}>();
}

