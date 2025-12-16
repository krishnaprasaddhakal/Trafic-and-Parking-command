import { Component, Input } from '@angular/core';
import { Camera } from '../../../../mock-data/dashboard.mock';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-camera-sidebar',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './camera-sidebar.component.html',
  styleUrl: './camera-sidebar.component.scss'
})
export class CameraSidebarComponent {
  @Input() items: Camera[] = [];
}
