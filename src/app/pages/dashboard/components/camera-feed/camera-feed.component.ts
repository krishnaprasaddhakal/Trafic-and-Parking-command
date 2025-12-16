import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Camera } from '../../../../mock-data/dashboard.mock';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-camera-feed',
  standalone: true,
  imports: [NgFor],
  templateUrl: './camera-feed.component.html',
  styleUrl: './camera-feed.component.scss'
})
export class CameraFeedComponent {
  @Input() camera!: Camera;
  @Input() options: Camera[] = [];
  @Output() select = new EventEmitter<Camera>();
  onSelect(id: string) {
    const found = this.options.find(c => c.id === id);
    if (found) this.select.emit(found);
  }
}

