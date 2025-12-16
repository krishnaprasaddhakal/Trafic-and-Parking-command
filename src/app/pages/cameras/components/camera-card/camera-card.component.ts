import { Component, Input } from '@angular/core';
import { Camera } from '../../../../mock-data/cameras.mock';

@Component({
  selector: 'app-camera-card',
  standalone: true,
  templateUrl: './camera-card.component.html',
  styleUrl: './camera-card.component.scss'
})
export class CameraCardComponent {
  @Input() camera!: Camera;
  statusClass() {
    return {
      Active: 'active',
      Inactive: 'inactive',
      Maintenance: 'maintenance',
      Violation: 'violation',
    }[this.camera.status];
  }
}

