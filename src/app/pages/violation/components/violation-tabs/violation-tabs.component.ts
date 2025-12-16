import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor } from '@angular/common';

export type ViolationTab = { key: string; label: string; count: number };

@Component({
  selector: 'app-violation-tabs',
  standalone: true,
  imports: [NgFor],
  templateUrl: './violation-tabs.component.html',
  styleUrl: './violation-tabs.component.scss'
})
export class ViolationTabsComponent {
  @Input() tabs: ViolationTab[] = [];
  @Input() active = 'All';
  @Output() change = new EventEmitter<string>();
}

