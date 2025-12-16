import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateRangeComponent } from '../date-range/date-range.component';

@Component({
  selector: 'app-violation-filter-bar',
  standalone: true,
  imports: [FormsModule, DateRangeComponent],
  templateUrl: './violation-filter-bar.component.html',
  styleUrl: './violation-filter-bar.component.scss'
})
export class ViolationFilterBarComponent {
  @Input() view: 'grid' | 'list' = 'list';
  @Input() search = '';
  @Input() filterCount = 0;
  @Input() month = 'Jan 2024';
  @Input() startDate = '';
  @Input() endDate = '';
  @Output() viewChange = new EventEmitter<'grid' | 'list'>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() clearAll = new EventEmitter<void>();
  @Output() monthChange = new EventEmitter<string>();
  @Output() dateRangeChange = new EventEmitter<{start: string, end: string}>();
  toggleView() {
    this.viewChange.emit(this.view === 'grid' ? 'list' : 'grid');
  }
}
