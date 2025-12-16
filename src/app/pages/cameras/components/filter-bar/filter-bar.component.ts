import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss'
})
export class FilterBarComponent {
  @Input() view: 'grid' | 'list' = 'grid';
  @Input() filter = 'All';
  @Input() search = '';
  @Input() filterCount = 0;
  @Output() viewChange = new EventEmitter<'grid' | 'list'>();
  @Output() filterChange = new EventEmitter<string>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() clearAll = new EventEmitter<void>();

  toggleView() {
    this.viewChange.emit(this.view === 'grid' ? 'list' : 'grid');
  }
}

