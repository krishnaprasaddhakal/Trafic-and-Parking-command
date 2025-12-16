import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { TopbarComponent } from '../../shared/topbar/topbar.component';
import { StatsCardComponent } from './components/stats-card/stats-card.component';
import { CameraFeedComponent } from './components/camera-feed/camera-feed.component';
import { CameraThumbnailComponent } from './components/camera-thumbnail/camera-thumbnail.component';
import { CameraSidebarComponent } from './components/camera-sidebar/camera-sidebar.component';
import { signal } from '@angular/core';
import { CAMERA_FEEDS, OTHER_CAMERAS, STATS, Camera } from '../../mock-data/dashboard.mock';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [NgFor, TopbarComponent, StatsCardComponent, CameraFeedComponent, CameraThumbnailComponent, CameraSidebarComponent],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
})
export class DashboardPage {
  stats = STATS;
  selected = signal<Camera>(CAMERA_FEEDS[0]);
  feeds = CAMERA_FEEDS;
  others = OTHER_CAMERAS;

  select(cam: Camera) {
    this.selected.set(cam);
  }
}
