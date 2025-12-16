import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { Camera } from '../../../../mock-data/cameras.mock';
import { CameraCardComponent } from '../camera-card/camera-card.component';

@Component({
  selector: 'app-camera-grid',
  standalone: true,
  imports: [NgFor, CameraCardComponent],
  templateUrl: './camera-grid.component.html',
  styleUrl: './camera-grid.component.scss'
})
export class CameraGridComponent {
  @Input() items: Camera[] = [];
}

