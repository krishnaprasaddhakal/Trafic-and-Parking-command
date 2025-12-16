import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Violation } from '../../../../mock-data/violations.mock';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-violation-row',
  standalone: true,
  imports: [NgFor],
  templateUrl: './violation-row.component.html',
  styleUrl: './violation-row.component.scss'
})
export class ViolationRowComponent {
  @Input() item!: Violation;
  @Output() evidenceClick = new EventEmitter<string>();
  statusClass() {
    return {
      Overstayed: 'overstayed',
      'Over Speeding': 'speeding',
      'Double Parking': 'double',
    }[this.item.type];
  }
}

