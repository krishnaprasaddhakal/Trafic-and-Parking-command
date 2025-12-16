import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor } from '@angular/common';

export type StatusTab = { key: string; label: string; count: number };

@Component({
  selector: 'app-status-tabs',
  standalone: true,
  imports: [NgFor],
  templateUrl: './status-tabs.component.html',
  styleUrl: './status-tabs.component.scss'
})
export class StatusTabsComponent {
  @Input() tabs: StatusTab[] = [];
  @Input() active = 'All';
  @Output() change = new EventEmitter<string>();
}

