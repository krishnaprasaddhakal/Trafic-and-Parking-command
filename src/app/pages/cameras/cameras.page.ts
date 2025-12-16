import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { TopbarComponent } from '../../shared/topbar/topbar.component';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CamerasService } from '../../services/cameras.service';
import { Camera } from '../../mock-data/cameras.mock';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { StatusTabsComponent, StatusTab } from './components/status-tabs/status-tabs.component';
import { CameraGridComponent } from './components/camera-grid/camera-grid.component';

@Component({
  selector: 'app-cameras-page',
  standalone: true,
  imports: [NgFor, NgIf, TopbarComponent, FormsModule, FilterBarComponent, StatusTabsComponent, CameraGridComponent],
  templateUrl: './cameras.page.html',
  styleUrl: './cameras.page.scss',
})
export class CamerasPage {
  headerTitle = 'Live Traffic & Parking Cameras';
  headerSubtitle = 'Real-time view of parking occupancy, illegal parking, and camera feeds.';
  sectionTitle = 'Cameras';
  sectionSubtitle = 'Manage CCTV feeds connected to Smart Parking AI.';
  addButtonLabel = 'Add Camera';
  footerText = '© 2025 NGN Traffic & Parking Command | All Right Reserved';
  view: 'grid' | 'list' = 'grid';
  statusFilter = 'All';
  search = '';
  items: Camera[] = [];
  constructor(route: ActivatedRoute, private service: CamerasService) {
    route.queryParamMap.subscribe((p) => {
      this.search = p.get('q') ?? '';
    });
    this.service.list().subscribe((items) => (this.items = items));
  }
  get filtered() {
    const q = this.search.toLowerCase().trim();
    let arr = this.items;
    if (this.statusFilter !== 'All') {
      arr = arr.filter((i) => i.status === this.statusFilter);
    }
    return !q
      ? arr
      : arr.filter((i) => i.code.toLowerCase().includes(q) || i.name.toLowerCase().includes(q));
  }
  tabs: StatusTab[] = [
    { key: 'All', label: 'All', count: 27 },
    { key: 'Violation', label: 'Violation', count: 4 },
    { key: 'Active', label: 'Active', count: 4 },
    { key: 'Maintenance', label: 'Maintenance', count: 7 },
    { key: 'Inactive', label: 'Inactive', count: 12 },
  ];
  get filterCount() {
    let c = 0;
    if (this.statusFilter !== 'All') c++;
    if (this.search.trim()) c++;
    return c;
  }
  onViewChange(v: 'grid' | 'list') { this.view = v; }
  onFilterChange(v: string) { this.statusFilter = v; }
  onSearchChange(v: string) { this.search = v; }
  onClearAll() { this.statusFilter = 'All'; this.search = ''; }
  addOpen = false;
  newCamera: Partial<Camera> = { name: '', location: '', code: '', status: 'Active' };
  addCamera() { this.addOpen = true; }
  closeAdd() { this.addOpen = false; this.newCamera = { name: '', location: '', code: '', status: 'Active' }; }
  saveCamera() {
    const n = this.newCamera;
    if (!n || !n.name || !n.code) return;
    const id = String(this.items.length + 1);
    const cam: Camera = {
      id,
      name: n.name!,
      location: n.location || '—',
      code: n.code!,
      status: (n.status as Camera['status']) || 'Active',
      count: 0,
      image: 'assets/images/camera-dummy.svg'
    };
    this.items = [cam, ...this.items];
    this.closeAdd();
  }
}
