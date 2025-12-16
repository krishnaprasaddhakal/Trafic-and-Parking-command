import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Camera } from '../../../../mock-data/dashboard.mock';

@Component({
  selector: 'app-camera-thumbnail',
  standalone: true,
  templateUrl: './camera-thumbnail.component.html',
  styleUrl: './camera-thumbnail.component.scss'
})
export class CameraThumbnailComponent {
  @Input() camera!: Camera;
  @Output() select = new EventEmitter<Camera>();
}

